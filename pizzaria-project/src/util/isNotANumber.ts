export function isNotANumber(value: any): boolean {
    return typeof value !== "number" || isNaN(value);
  }