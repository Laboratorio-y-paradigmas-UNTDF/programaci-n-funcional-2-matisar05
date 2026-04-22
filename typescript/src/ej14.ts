// Ejercicio 14 — Memoization (5 pts)
// Trazabilidad: F-28, F-29

// Memoize genérico para funciones de 1 argumento. Usa Map como cache.
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  return (arg: T): R => {
    if (caches.has(arg)) {
      return caches.get(arg)!;
    }
    const result = fn(arg)
    caches.set(arg, result)
    return result;
  }
}

// Fibonacci recursivo clásico (sin memo).
export function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Wrapper que cuenta llamadas. Retorna { call, count }.
export function callCounter<A extends unknown[], R>(fn: (...args: A) => R): {
  call: (...args: A) => R;
  count: () => number;
} {
  let counter = 0;
  return {
    call: (...args: A) => {
      counter++;
      return fn(...args);
    },
    count: () => counter,
  }
}
