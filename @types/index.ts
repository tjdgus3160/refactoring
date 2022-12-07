export interface Invoice {
  customer: string;
  performances: Pick<Performance, "playID" | "audience">[];
}

export interface Performance {
  playID: string;
  audience: number;
  play: Play;
  amount: number;
  volumeCredits: number;
}

export interface Plays {
  [key: string]: Play;
}

export interface Play {
  name: string;
  type: "tragedy" | "comedy";
}

export interface StatementData {
  customer: string;
  performances: Performance[];
  totalAmount?: number;
  totalVolumeCredits?: number;
}
