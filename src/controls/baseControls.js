export class BaseControls {
  constructor(onSetDirection, target) {
    this.onSetDirection = onSetDirection;
    this.target = target;
  }

  init() {
    throw Error('@override');
  }

  clear() {
    throw Error('@override');
  }
}
