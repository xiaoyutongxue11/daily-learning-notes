const flatten = (arr) => {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};
console.log(flatten([1, 2, [3, 4, [5, 6]]]));
