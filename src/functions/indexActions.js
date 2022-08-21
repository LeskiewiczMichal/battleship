const update = (target, index) => {
  if (target.classList.contains('horizontal')) {
    return index + 1;
  }
  return index + 10;
};

const find = (searchIn, lookFor) => {
  for (let i = 0; i < searchIn.length; i++) {
    if (searchIn[i] === lookFor) {
      return i;
    }
  }
};

export { update, find };
