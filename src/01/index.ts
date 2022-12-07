import invoices from "./data/invoices.json";
import plays from "./data/plays.json";
import { Invoice, StatementData } from "../../@types";
import createStatementData from "./createStatementData";

export const statement = (invoice: Invoice) =>
  renderPlainText(createStatementData(invoice));

export const htmlStatement = (invoice: Invoice) =>
  renderHtml(createStatementData(invoice));

function renderHtml(data: StatementData) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</hi>\n`;
  result += `<table>\n`;
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${
      perf.audience
    }</td><td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${usd(data.totalVolumeCredits)}</em>점</p>\n`;

  return result;
}

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

  return result;
}

function usd(aNumber: number) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

console.log(statement(invoices[0]));
console.log(htmlStatement(invoices[0]));
