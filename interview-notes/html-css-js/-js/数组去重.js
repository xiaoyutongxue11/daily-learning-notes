function unique1(arr) {
  return [...new Set(arr)];
}

function unique2(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

function unique3(arr) {
  return arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      pre.push(cur);
    }
    return pre;
  }, []);
}

console.log(
  unique3([1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])
);
