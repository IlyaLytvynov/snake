import { UAParser } from 'ua-parser-js';

const OS = {
  IOS: 'iOS',
  ANDROID: 'Android',
  MAC_OS: 'Mac OS'
};
export class PlatformParser {
  static create() {
    return new PlatformParser();
  }

  constructor() {
    this.uaParser = new UAParser();
    this.result = this.uaParser.getResult();
  }

  getOs() {
    console.log(this.result.os);
    return this.result.os.name;
  }

  isTouchSupports() {
    return this.getOs() === OS.IOS || this.getOs() === OS.ANDROID;
  }
}
