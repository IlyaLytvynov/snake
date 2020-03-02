import { PlatformParser } from '../platformParser';
import { KeyboardControls } from './keyboardControls';

export class ControlsFactory {
  static bootstrap(onSetDirection) {
    const controls = new ControlsFactory(onSetDirection);
    controls.init();
    return controls;
  }

  constructor(onSetDirection) {
    this.onSetDirection = onSetDirection;
  }

  init() {
    const parser = PlatformParser.create();
    const test = parser.isTouchSupports();
    if (test) {
      // This.controls = new TouchControls(this.onSetDirection)
    } else {
      this.controls = KeyboardControls.bootstrap(this.onSetDirection);
    }
  }

  clear() {
    this.controls.clear();
  }
}
