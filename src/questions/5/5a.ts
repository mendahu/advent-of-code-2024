import {
  getRulesAndOrders,
  getSumOfOrders,
  separateOrders,
} from "./helpers.js";

export default function (data: string): void {
  const { rules, orders } = getRulesAndOrders(data);

  const [correctOrders] = separateOrders(rules, orders);

  const sum = getSumOfOrders(correctOrders);

  console.log(sum);
}
