import invoices from "../src/01/data/invoices.json";
import plays from "../src/01/data/plays.json";
import { statement } from "../src/01/index";
import { Plays } from "../@types";

describe("연극 비용 책정", () => {
  test("올바른 인자가 전달되면 바르게 출력된다.", () => {
    expect(statement(invoices[0])).toBe(
      "청구 내역 (고객명: BigCo)\n  Hamlet: $650.00 (55석)\n  As Your Like It: $580.00 (35석)\n  Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n"
    );
  });
});
