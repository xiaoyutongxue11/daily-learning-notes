class FileUploader {
  constructor() {
    this.worker = new Worker("upload.worker.js");
    this.worker.onmessage = this.handleWorkerMessage.bind(this);
    this.callbacks = {};
  }

  handleWorkerMessage(e) {
    const { type, fileId, data } = e.data;

    switch (type) {
      case "progress":
        this.callbacks[fileId]?.onProgress?.(data);
        break;
      case "complete":
        this.callbacks[fileId]?.onComplete?.(data);
        delete this.callbacks[fileId];
        break;
      case "error":
        this.callbacks[fileId]?.onError?.(data);
        delete this.callbacks[fileId];
        break;
    }
  }

  uploadFile(file, options = {}) {
    const fileId = this.generateFileId(file);
    const chunkSize = options.chunkSize || 5 * 1024 * 1024; // 默认5MB

    this.callbacks[fileId] = {
      onProgress: options.onProgress,
      onComplete: options.onComplete,
      onError: options.onError,
    };

    this.worker.postMessage({
      type: "upload",
      data: {
        file,
        fileId,
        chunkSize,
        url: options.url || "/upload", // 上传接口URL
      },
    });

    return fileId;
  }

  resumeUpload(fileId, callbacks = {}) {
    this.callbacks[fileId] = callbacks;
    this.worker.postMessage({
      type: "resume",
      data: { fileId },
    });
  }

  generateFileId(file) {
    return `${file.name}-${file.size}-${file.lastModified}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }
}

// 使用示例
const uploader = new FileUploader();

document.getElementById("file-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileId = uploader.uploadFile(file, {
    chunkSize: 2 * 1024 * 1024, // 2MB分片
    url: "/api/upload",
    onProgress: (progress) => {
      console.log(`上传进度: ${progress.percentage}%`);
      document.getElementById("progress").value = progress.percentage;
    },
    onComplete: (data) => {
      console.log("上传完成", data);
      alert("文件上传完成!");
    },
    onError: (err) => {
      console.error("上传错误", err);
      alert(`上传失败: ${err.message}`);
    },
  });

  // 可以将fileId保存到本地，用于断点续传
  localStorage.setItem("lastUploadId", fileId);
});

// 恢复上传示例
document.getElementById("resume-btn").addEventListener("click", () => {
  const fileId = localStorage.getItem("lastUploadId");
  if (fileId) {
    uploader.resumeUpload(fileId, {
      onProgress: (progress) => {
        console.log(`恢复上传进度: ${progress.percentage}%`);
        document.getElementById("progress").value = progress.percentage;
      },
      onComplete: (data) => {
        console.log("恢复上传完成", data);
        alert("文件上传完成!");
      },
      onError: (err) => {
        console.error("恢复上传错误", err);
        alert(`恢复上传失败: ${err.message}`);
      },
    });
  }
});
