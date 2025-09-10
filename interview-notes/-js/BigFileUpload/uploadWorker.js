// IndexedDB数据库操作类
class UploadDB {
  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open("FileUploadDB", 1);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("chunks")) {
          const store = db.createObjectStore("chunks", { keyPath: "id" });
          store.createIndex("fileId", "fileId", { unique: false });
        }
      };

      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getFileRecord(fileId) {
    const db = await this.dbPromise;
    return new Promise((resolve) => {
      const tx = db.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const request = store.get(fileId);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  }

  async saveFileRecord(record) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      const request = store.put(record);

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getUploadedChunks(fileId) {
    const db = await this.dbPromise;
    return new Promise((resolve) => {
      const tx = db.transaction("chunks", "readonly");
      const store = tx.objectStore("chunks");
      const index = store.index("fileId");
      const request = index.getAll(IDBKeyRange.only(fileId));

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    });
  }

  async saveChunk(chunk) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction("chunks", "readwrite");
      const store = tx.objectStore("chunks");
      const request = store.put(chunk);

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }
}

// 上传管理器
class UploadManager {
  constructor() {
    this.db = new UploadDB();
    this.activeUploads = new Map();
  }

  async startUpload({ file, fileId, chunkSize, url }) {
    // 检查是否已有上传记录
    let fileRecord = await this.db.getFileRecord(fileId);

    if (!fileRecord) {
      // 新文件，初始化记录
      fileRecord = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedSize: 0,
        totalChunks: Math.ceil(file.size / chunkSize),
        completedChunks: 0,
        status: "uploading",
        createdAt: new Date(),
        url,
      };

      await this.db.saveFileRecord(fileRecord);
    }

    // 获取已上传的分片
    const uploadedChunks = await this.db.getUploadedChunks(fileId);
    const uploadedChunkMap = new Map(
      uploadedChunks.map((c) => [c.chunkNumber, c])
    );

    // 开始上传
    this.uploadChunks(file, fileRecord, uploadedChunkMap, chunkSize, url);
  }

  async resumeUpload(fileId) {
    const fileRecord = await this.db.getFileRecord(fileId);
    if (!fileRecord || fileRecord.status === "completed") {
      self.postMessage({
        type: "error",
        fileId,
        data: new Error("无法恢复上传: 文件记录不存在或已上传完成"),
      });
      return;
    }

    const uploadedChunks = await this.db.getUploadedChunks(fileId);
    const uploadedChunkMap = new Map(
      uploadedChunks.map((c) => [c.chunkNumber, c])
    );

    // 创建一个虚拟文件对象
    const file = new Blob([], {
      type: fileRecord.type,
      name: fileRecord.name,
    });
    file.size = fileRecord.size;

    this.uploadChunks(
      file,
      fileRecord,
      uploadedChunkMap,
      fileRecord.chunkSize,
      fileRecord.url
    );
  }

  async uploadChunks(file, fileRecord, uploadedChunkMap, chunkSize, url) {
    const fileId = fileRecord.id;
    const totalChunks = fileRecord.totalChunks;

    try {
      for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
        if (uploadedChunkMap.has(chunkNumber)) {
          // 分片已上传，跳过
          continue;
        }

        const start = chunkNumber * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);

        // 上传分片
        await this.uploadChunk(chunk, {
          fileId,
          chunkNumber,
          totalChunks,
          chunkSize: end - start,
          fileName: fileRecord.name,
          url,
        });

        // 保存分片记录
        await this.db.saveChunk({
          id: `${fileId}_${chunkNumber}`,
          fileId,
          chunkNumber,
          size: end - start,
          uploadedAt: new Date(),
        });

        // 更新文件记录
        fileRecord.completedChunks++;
        fileRecord.uploadedSize += end - start;
        await this.db.saveFileRecord(fileRecord);

        // 发送进度更新
        self.postMessage({
          type: "progress",
          fileId,
          data: {
            percentage: Math.round((fileRecord.uploadedSize / file.size) * 100),
            uploadedSize: fileRecord.uploadedSize,
            totalSize: file.size,
            chunkNumber,
            totalChunks,
          },
        });
      }

      // 上传完成
      fileRecord.status = "completed";
      fileRecord.completedAt = new Date();
      await this.db.saveFileRecord(fileRecord);

      self.postMessage({
        type: "complete",
        fileId,
        data: fileRecord,
      });
    } catch (error) {
      self.postMessage({
        type: "error",
        fileId,
        data: error,
      });
    }
  }

  async uploadChunk(
    chunk,
    { fileId, chunkNumber, totalChunks, chunkSize, fileName, url }
  ) {
    // 这里使用fetch API模拟分片上传
    // 实际项目中需要替换为你的上传逻辑

    const formData = new FormData();
    formData.append("file", chunk, fileName);
    formData.append("chunkNumber", chunkNumber);
    formData.append("totalChunks", totalChunks);
    formData.append("fileId", fileId);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`上传分片失败: ${response.statusText}`);
    }

    return response.json();
  }
}

// 初始化上传管理器
const uploadManager = new UploadManager();

// 监听主线程消息
self.onmessage = async (e) => {
  const { type, data } = e.data;

  try {
    switch (type) {
      case "upload":
        await uploadManager.startUpload(data);
        break;
      case "resume":
        await uploadManager.resumeUpload(data.fileId);
        break;
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      fileId: data?.fileId,
      data: error,
    });
  }
};
