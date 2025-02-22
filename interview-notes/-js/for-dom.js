function bianli(root) {
  if (root.children.length === 0) return;
  let queue = [root];
  while (queue.length > 0) {
    let node = queue.shift();
    console.log(node.tagName);
    Array.from(node.children).forEach((child) => queue.push(child));
  }
}

const rootNode = document.getElementById("root");
bfsTraversal(rootNode);