export interface Invoice {
  customer: string;
  performances: { playID: string; audience: number }[];
}

export interface Plays {
  [key: string]: {
    name: string;
    type: "tragedy" | "comedy";
  };
}
