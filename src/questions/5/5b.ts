import {
  getRulesAndOrders,
  getSumOfOrders,
  separateOrders,
} from "./helpers.js";

const ruleExistsByValues = (
  rules: number[][],
  value1: number,
  value2: number
): boolean => {
  return rules.some((rule) => rule[0] === value1 && rule[1] === value2);
};

export const reorderPages = (
  incorrectOrder: number[],
  rules: number[][]
): number[] => {
  return incorrectOrder.sort((a, b) => {
    if (ruleExistsByValues(rules, a, b)) {
      return -1;
    } else if (ruleExistsByValues(rules, b, a)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export default function (data: string): void {
  const { rules, orders } = getRulesAndOrders(data);

  const [_, incorrectOrders] = separateOrders(rules, orders);

  const correctedOrders = incorrectOrders.map((order) =>
    reorderPages(order, rules)
  );

  const sum = getSumOfOrders(correctedOrders);

  console.log(sum);
}
