import { AssertionError } from "assert";

export function assertNotNull<T>(
  arg: T,
): asserts arg is Exclude<T, null | undefined> {
  if (arg === null) {
    throw new AssertionError({ message: "Invalid null" });
  }
}
