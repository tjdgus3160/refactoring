import { Performance, Play } from "../../@types";

export default class PerformanceCalculator {
  constructor(public performance: Performance, public play: Play) {}

  get volumeCredits() {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);

    if (this.play.type === "comedy") {
      result += Math.floor(this.performance.audience / 5);
    }

    return result;
  }
}
