const die = (dice, sides, add) => {
  if (!Number.isInteger(dice)) {
    return false;
  } else if (!Number.isInteger(sides)) {
    return false;
  } else {
    let count = 0;
    for (let i = 0; i < dice; i++) {
      count += Math.ceil(Math.random() * sides);
    }
    if (add) {
      count += add;
    }
    return count;
  }
};
module.exports = die;
