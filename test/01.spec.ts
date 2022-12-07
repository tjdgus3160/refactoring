import invoices from "../src/01/data/invoices.json";
import plays from "../src/01/data/plays.json";
import { statement } from "../src/01/index";
import { Plays } from "../@types";

describe("연극 비용 책정", () => {
  test("올바른 인자가 전달되면 바르게 출력된다.", () => {
    expect(statement(invoices[0], plays as Plays)).toBe(
      "청구 내역 (고객명: BigCo)\n  Hamlet: $650.00 (55석)\n  As Your Like It: $580.00 (35석)\n  Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n"
    );
  });
  test("잘못된 인자 전달시 에러가 출력된다.", () => {
    const wrongType = "error";
    const wrongPlays = { hamlet: { name: "Hamlet", type: wrongType } };
    try {
      statement(invoices[0], wrongPlays as Plays);
    } catch (e) {
      expect(e.message).toBe(`알 수 없는 장르: ${wrongType}`);
    }
  });
});
