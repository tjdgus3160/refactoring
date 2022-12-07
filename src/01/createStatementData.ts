import { Invoice, StatementData, Performance, Play } from "../../@types";
import plays from "./data/plays.json";
import PerformanceCalculator from "./PerformanceCalculator";

export default function createStatementData(invoice: Invoice) {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}

function enrichPerformance(aPerformance: Performance): Performance {
  const { play, amount, volumeCredits } = createPerformanceCalculator(
    aPerformance,
    playFor(aPerformance)
  );

  return {
    ...aPerformance,
    play,
    amount,
    volumeCredits,
  };
}

function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${this.play.type}`);
  }
}

function totalAmount(data: StatementData) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data: StatementData) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function playFor(aPerformance: Performance) {
  return plays[aPerformance.playID];
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}
