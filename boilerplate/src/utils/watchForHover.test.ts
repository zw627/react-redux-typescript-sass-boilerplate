import mockdate from "mockdate";

import watchForHover, {
  enableHover,
  disableHover,
  updateLastTouchTime,
} from "Utils/watchForHover";

mockdate.set(1574086940640);

describe("utils/watchForHover", () => {
  //   let addEventListener: EventListenerOptions;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener = jest.fn();
  });

  it('should add "hover-enabled" class to <body> if mouse is detected', () => {
    enableHover(document.body, false, 1574086900640);
    expect(document.body.className).toEqual("hover-enabled");
    // no change detected and hover is already enabled
    enableHover(document.body, true, 1574086900640);
    expect(document.body.className).toEqual("hover-enabled");
  });

  it('should remove "hover-enabled" class from <body> if touch is detected', () => {
    disableHover(document.body, true);
    expect(document.body.className).toEqual("");
    // no change detected and hover is already disabled
    disableHover(document.body, false);
    expect(document.body.className).toEqual("");
    // if touch and hold does not exceed 10s (trade off), do not enable hover
    enableHover(document.body, false, 1574086940640);
    expect(document.body.className).toEqual("");
  });

  it("should return the time value in milliseconds", () => {
    expect(updateLastTouchTime()).toEqual(new Date().getTime());
  });

  it("should attach event listeners", () => {
    watchForHover();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.addEventListener).toHaveBeenNthCalledWith(
      1,
      "touchstart",
      expect.any(Function),
      true
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.addEventListener).toHaveBeenNthCalledWith(
      2,
      "touchstart",
      expect.any(Function),
      true
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.addEventListener).toHaveBeenNthCalledWith(
      3,
      "mousemove",
      expect.any(Function),
      true
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.addEventListener).toHaveBeenCalledTimes(3);
  });
});
