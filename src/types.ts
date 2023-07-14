export interface CounterItem {
  title: string;
  count: number;
  lastAction?: "add" | "subtract";
  step: number;
}
