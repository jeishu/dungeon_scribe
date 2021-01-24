const die = require("../lib/die");

test("roll single d6 with no add gives integer 1 to 6", () => {
  const e = die(1, 6);
  let zeroToSix = (num) => {
    if (Number.isInteger(num) && num < 7 && num > 0) {
      return true;
    }
  };
  expect(zeroToSix(e)).toBe(true);
});

test("roll 10 d10s with no add gives at least 10", () => {
  const e = die(10, 10);
  let greaterThanTen = (num) => {
    if (num > 10) {
      return true;
    }
  };
  expect(greaterThanTen(e)).toBe(true);
});

test("single argument will fail", () => {
  const e = die(10);
  expect(e).toBe(false);
});

test("string arguments will fail", () => {
  const e = die("pizza", 10);
  expect(e).toBe(false);
});
