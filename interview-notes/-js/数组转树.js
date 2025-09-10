const flatArray = [
  { id: 1, name: "部门A", parentId: null },
  { id: 2, name: "部门B", parentId: 1 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 2 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 7, name: "部门G", parentId: null },
];

const arrToTree = (
  items,
  idKey = "id",
  parentIdKey = "parentId",
  childrenKey = "children"
) => {
  let map = new Map();
  items.forEach((item) => {
    map.set(item[idKey], { [childrenKey]: [], ...item });
  });
  let res = [];
  for (let i = 0; i < items.length; i++) {
    let item = map.get(items[i][idKey]);
    let parentId = items[i][parentIdKey];
    if (!parentId) {
      res.push(item);
    } else {
      let parent = map.get(parentId);
      parent[childrenKey].push(item);
      map.set(parentId, parent);
    }
  }
  return res;
};
const ans = arrToTree(flatArray);
console.log(JSON.stringify(ans));

// [
//   {
//     children: [
//       {
//         children: [
//           { children: [], id: 4, name: "部门D", parentId: 2 },
//           { children: [], id: 5, name: "部门E", parentId: 2 },
//         ],
//         id: 2,
//         name: "部门B",
//         parentId: 1,
//       },
//       {
//         children: [{ children: [], id: 6, name: "部门F", parentId: 3 }],
//         id: 3,
//         name: "部门C",
//         parentId: 1,
//       },
//     ],
//     id: 1,
//     name: "部门A",
//     parentId: null,
//   },
//   { children: [], id: 7, name: "部门G", parentId: null },
// ];
