const TA = require("./transit-analysis");


// simple averageWaitTime 
// AWT = SUM(D^2)/2T

test("Array with only one timestamp. No start or end specified.", () => {
  expect(TA.averageWaitTime([new Date(2022, 11, 26, 11, 0)])).toBe(0);
});

let timestamps_twoArrivals = [
  new Date(2022, 11, 26, 11, 0),
  new Date(2022, 11, 26, 11, 10),
];
test("Simple case: two arrivals", () => {
  expect(TA.averageWaitTime(timestamps_twoArrivals)).toBe(5);
});

let timestamps_fourArrivals = [
  new Date(2022, 11, 26, 11, 0),
  new Date(2022, 11, 26, 11, 10),
  new Date(2022, 11, 26, 11, 20),
  new Date(2022, 11, 26, 11, 30),
];
test("Multiple arrivals, equally spaced 10 minutes apart", () => {
  expect(TA.averageWaitTime(timestamps_fourArrivals)).toBe(5);
});

let timestamps_spaced20Mins = [
  new Date(2022, 11, 26, 11, 0),
  new Date(2022, 11, 26, 11, 20),
  new Date(2022, 11, 26, 11, 40),
  new Date(2022, 11, 26, 12, 0),
];
test("Multiple arrivals, equally spaced 20 minutes apart", () => {
  expect(TA.averageWaitTime(timestamps_spaced20Mins)).toBe(10);
});

timestamps4 = [
  new Date(2022, 11, 26, 11, 20),
  new Date(2022, 11, 26, 11, 0),
  new Date(2022, 11, 26, 11, 30),
  new Date(2022, 11, 26, 11, 10),
];
test("Multiple arrivals, equally spaced, not in sequential order", () => {
  expect(TA.averageWaitTime(timestamps4)).toBe(5);
});


// averageWaitTime inside a timeframe

// TODO write the following tests:
// start and stop times match first and last in arrival timestamps
// start before first timestamp
// start after first timestamp
// end before last timestamps (need to grab timestamp immediately after timeframe end)
// end after last timestamp (not technically possible)
