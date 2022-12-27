module.exports = { averageWaitTime };

/**
 * Calculate the average wait time (AWT) of riders at a transit stop.
 * The calculation weights the time assuming constant ridership. AWT = SUM(D^2)/2T, where D = the duration between arrivals and T = the timeframe duration.
 *
 * @param {Date[]} arrivals - A Date object array of timestamps representing arrivals at the stop.
 * @param {Date} [start] - An optional start for the timeframe. Defaults to the earliest time in the timestamps array.
 * @param {Date} [end] - An optional end for the timeframe. Defaults to the last time in the timestamps array.
 * @return {number} The AWT in minutes
 */
function averageWaitTime(arrivals, start, end) {
  
  //sort in ascending order
  arrivals = arrivals.sort((a, b) => a - b);

  let firstTimestamp = arrivals[0];
  let lastTimestamp = arrivals[arrivals.length - 1];
  let T = (lastTimestamp - firstTimestamp) / 60000; //minutes

  if (T === 0)
    return 0;

  let waitDurations = getDurationsBetween(arrivals);
  let AWT = sum(square(waitDurations)) / (2 * T);
  return AWT;
}

function getDurationsBetween(arrivals) {
  return diffArray(arrivals).map((x) => x / 60000); //minutes
}

function square(arr) {
  return arr.map((x) => x ** 2);
}
function sum(arr) {
  return arr.reduce((sum, val) => sum + val, 0);
}

function diffArray(arr) {
  return arr
    .map((val, i) => {
      // Check if it's the last element in the array
      if (i === arr.length - 1) {
        return;
      }
      return arr[i + 1] - val;
    })
    .filter((val) => val); // Filter out any undefined values
}
