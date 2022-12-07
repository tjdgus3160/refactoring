export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Performance {
  playID: string;
  audience: number;
}

export interface Plays {
  [key: string]: Play;
}

export interface Play {
  name: string;
  type: "tragedy" | "comedy";
}
