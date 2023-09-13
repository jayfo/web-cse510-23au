import { AssertionError } from "assert";

export function assertNotNull<T>(
  arg: T,
): asserts arg is Exclude<T, null | undefined> {
  if (arg === null) {
    throw new AssertionError({ message: "Invalid null" });
  }
}

export function assertNotUndefined<T>(
  arg: T,
): asserts arg is Exclude<T, undefined> {
  if (arg === undefined) {
    throw new AssertionError({ message: "Invalid undefined" });
  }
}

export function assertNotNullNotUndefined<T>(
  arg: T,
): asserts arg is Exclude<T, null | undefined> {
  if (arg === null) {
    throw new AssertionError({ message: "Invalid null" });
  }
  if (arg === undefined) {
    throw new AssertionError({ message: "Invalid undefined" });
  }
}
