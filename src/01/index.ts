import invoice from "./data/invoices.json";
import plays from "./data/plays.json";
import { Invoice, Performance, StatementData } from "../../@types";

export function statement(invoice: Invoice) {
  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  return renderPlainText(statementData);
}

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;

  return result;

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}

function amountFor(aPerformance: Performance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
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
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
  }

  return result;
}

function playFor(aPerformance: Performance) {
  return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance: Performance) {
  let result = 0;

  result += Math.max(aPerformance.audience - 30, 0);

  if (playFor(aPerformance).type === "comedy") {
    result += Math.floor(aPerformance.audience / 5);
  }

  return result;
}

function usd(aNumber: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function enrichPerformance(aPerformance: Performance) {
  return Object.assign({}, aPerformance);
}

console.log(statement(invoice[0]));
