import { AssertionError } from "assert";

export function assertNotNull<T>(arg: T): asserts arg is Exclude<T, null> {
  if (arg === null) {
    throw new AssertionError({ message: "Invalid null" });
  }
}
