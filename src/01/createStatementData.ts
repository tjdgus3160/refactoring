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
  return new PerformanceCalculator(aPerformance, aPlay);
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
