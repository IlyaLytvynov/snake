import { PlatformParser } from '../utils/platformParser';
import { KeyboardControls } from './keyboardControls';
import { TouchControls } from './touchControls';
import { BaseControls } from './baseControls';
export class ControlsFactory extends BaseControls {
  static bootstrap(onSetDirection, target) {
    const controls = new ControlsFactory(onSetDirection, target);
    controls.init();
    return controls;
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
    console.log('CELARED');
    this.controls.clear();
  }
}
