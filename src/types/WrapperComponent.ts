import { AssertionError } from "assert";

const WrapperComponentValues = ["div", "p", "span"] as const;
export type WrapperComponent = (typeof WrapperComponentValues)[number];

export function assertIsWrapperComponent(
  component: any,
): asserts component is WrapperComponent {
  if (!WrapperComponentValues.includes(component)) {
    throw new AssertionError({ message: "Invalid WrapperComponent" });
  }
}

export default WrapperComponent;
