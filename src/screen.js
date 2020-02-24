export class Screen {
  static getViewportSize() {
    const MAX_WIDTH = 1280;
    const MAX_HEIGHT = 1280;
    return {
      width: Math.min(window.innerWidth, MAX_WIDTH),
      height: Math.min(window.innerHeight, MAX_HEIGHT)
    };
  }
}
