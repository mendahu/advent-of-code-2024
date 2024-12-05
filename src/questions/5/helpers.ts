import { getCachedIndex } from "../../helpers/getCachedIndex.js";
import { getMiddleOfArray } from "../../helpers/getMiddleOfArray.js";

export const getRulesAndOrders = (
  data: string
): { rules: number[][]; orders: number[][] } => {
  const [section1, section2] = data.split("\n\n");

  const unparsedRules = section1.split("\n");
  const rules = unparsedRules.map((rule) => rule.split("|").map(Number));

  const unparsedOrders = section2.split("\n");
  const orders = unparsedOrders.map((order) => order.split(",").map(Number));

  return { rules, orders };
};

export const validateOrder = (order: number[], rules: number[][]): boolean => {
  const cache: Record<string | number | symbol, number> = {};

  for (const rule of rules) {
    const index1 = getCachedIndex(rule[0], order, cache);
    const index2 = getCachedIndex(rule[1], order, cache);

    if (index1 === -1 || index2 === -1) {
      continue;
    }

    if (index1 > index2) {
      return false;
    }
  }

  return true;
};

export const separateOrders = (
  rules: number[][],
  orders: number[][]
): number[][][] => {
  const correctOrders: number[][] = [];
  const incorrectOrders: number[][] = [];

  for (const order of orders) {
    if (!validateOrder(order, rules)) {
      incorrectOrders.push(order);
    } else {
      correctOrders.push(order);
    }
  }

  return [correctOrders, incorrectOrders];
};

export const getSumOfOrders = (orders: number[][]): number =>
  orders.reduce((acc, order) => acc + getMiddleOfArray(order), 0);
