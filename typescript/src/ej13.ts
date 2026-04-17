// Ejercicio 13 — Recursión de cola TS (5 pts)
// Trazabilidad: F-27

export type TreeNode = { value: number; children: TreeNode[] };

// Suma con acumulador (default 0). Recursiva, sin loops.
export function sumList(nums: number[], acc: number = 0): number {
  if (nums.length === 0) {
    return acc;
  }
  const [head, ...tail] = nums;
  return sumList(tail, acc + head);
}

// Factorial con acumulador (default 1). Recursiva, sin loops.
export function factorial(n: number, acc: number = 1): number {
  if (n === 0) {
    return acc;
  }
  return factorial(n - 1, acc * n);
}

// Busca value en árbol N-ario pre-order. Retorna valor o null.
export function findInTree(nodes: TreeNode[], target: number): number | null {
  if (nodes.length === 0) {
    return null;
  }
  const [head, ...tail] = nodes;
  if (head.value === target) {
    return head.value;
  }
  for (const child of head.children) {
    const result = findInTree([child], target);
    if (result !== null) {
      return result;
    }
  }
  return findInTree(tail, target);
}