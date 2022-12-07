import { Performance, Play } from "../../@types";

export default class PerformanceCalculator {
  constructor(public performance: Performance, public play: Play) {}

  public get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}
