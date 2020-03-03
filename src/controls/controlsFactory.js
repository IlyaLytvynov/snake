import { PlatformParser } from '../utils/platformParser';
import { KeyboardControls } from './keyboardControls';
import { TouchControls } from './touchControls';
export class ControlsFactory {
  static bootstrap(onSetDirection, target) {
    const controls = new ControlsFactory(onSetDirection, target);
    controls.init();
    return controls;
  }

  constructor(onSetDirection, target) {
    this.onSetDirection = onSetDirection;
    this.target = target;
  }

  init() {
    const parser = PlatformParser.create();
    const test = parser.isTouchSupports();
    if (test) {
      this.controls = TouchControls.bootstrap(this.onSetDirection, this.target);
    } else {
      this.controls = KeyboardControls.bootstrap(this.onSetDirection, document);
    }
  }

  clear() {
    this.controls.clear();
  }
}
