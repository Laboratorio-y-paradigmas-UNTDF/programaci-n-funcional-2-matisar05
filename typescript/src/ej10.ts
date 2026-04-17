// Ejercicio 10 — Result y validación encadenada (7 pts)
// Trazabilidad: F-19, F-20, F-21

export type FormData = { name: string; email: string; password: string };
export type Result<T, E> = { status: "ok"; value: T } | { status: "error"; error: E };
export type Validator<T> = (data: T) => Result<T, string>;

export function ok<T>(value: T): Result<T, string> {
  return { status: "ok", value };
}

export function err<T>(error: string): Result<T, string> {
  return { status: "error", error };
}

// Si result es error, propaga. Si ok, aplica validator al valor.
export function chain<T>(result: Result<T, string>, validator: Validator<T>): Result<T, string> {
  return result.status === "error" ? result : validator(result.value);
}

// Encadena: nombre requerido, email válido (tiene @ y .), password >= 8 chars.
export function validateForm(data: FormData): Result<FormData, string> {
  const checkName: Validator<FormData> = (data) =>
    data.name.trim() === "" ? err("nombre requerido") : ok(data);
  const checkEmail: Validator<FormData> = (data) =>
    data.email.includes("@") && data.email.includes(".") ? ok(data) : err("email inválido");
  const checkPassword: Validator<FormData> = (data) =>
    data.password.length >= 8 ? ok(data) : err("contraseña muy corta");
  //encadenamiento pipeline
  return chain(chain(checkName(data), checkEmail), checkPassword);
}

// 400 + error si falla, 200 + user si ok.
export function handleResult(result: Result<FormData, string>): { status: number; body: unknown } {
  if (result.status === "error") {
    return { status: 400, body: { error: result.error } };
  } else {
    return { status: 200, body: { user: result.value } };
  }
}