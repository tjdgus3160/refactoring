import { Invoice, StatementData, Performance } from "../../@types";
import plays from "./data/plays.json";

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
  const result: any = Object.assign({}, aPerformance);

  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);

  return result;
}

function totalAmount(data: StatementData) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data: StatementData) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function amountFor(aPerformance: Performance) {
  let result = 0;

  switch (aPerformance.play.type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
  }

  return result;
}

function playFor(aPerformance: Performance) {
  return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance: Performance) {
  let result = 0;

  result += Math.max(aPerformance.audience - 30, 0);

  if (aPerformance.play.type === "comedy") {
    result += Math.floor(aPerformance.audience / 5);
  }

  return result;
}
