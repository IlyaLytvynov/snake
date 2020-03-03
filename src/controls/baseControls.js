export class BaseControls {
  constructor(onSetDirection, target) {
    this.onSetDirection = onSetDirection;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.target = target;
  }

  addEventListeners() {
    throw Error('@override');
  }

  init() {
    throw Error('@override');
  }

  clear() {
    throw Error('@override');
  }
}
