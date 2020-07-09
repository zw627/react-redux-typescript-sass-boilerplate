import formatTime, { pad } from "Utils/formatTime";

describe("utils/formatTime", () => {
  it("should add a leading 0 to numbers that are smaller than 10 and remove all fractional digits from it", () => {
    expect(pad(0.6587)).toEqual("00");
    expect(pad(9.6587)).toEqual("09");
    expect(pad(10.6587)).toEqual("10");
    expect(pad(100.6587)).toEqual("100");
  });

  it("should return time in m:s.ms (00:00.00) format", () => {
    expect(formatTime(0)).toEqual("00:00.00");
    expect(formatTime(3594565)).toEqual("59:54.57");
  });
});
