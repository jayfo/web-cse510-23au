import { AssertionError } from "assert";

export type CourseStoreLink = string;

const CourseStoreLinkKeyValues = [
  "linkCanvas",
  "linkCanvasDiscussion",
  "linkGitHub",
  "linkUniversitySyllabusGuidelines",
] as const;
export type CourseStoreLinkKey = (typeof CourseStoreLinkKeyValues)[number];

export function assertIsCourseStoreLinkKey(
  courseStoreLinkKey: any,
): asserts courseStoreLinkKey is CourseStoreLinkKey {
  if (!CourseStoreLinkKeyValues.includes(courseStoreLinkKey)) {
    throw new AssertionError({ message: "Invalid CourseStoreLinkKey" });
  }
}

export interface CourseStoreData {
  linkCanvas?: CourseStoreLink;
  linkGitHub?: CourseStoreLink;
  linkUniversitySyllabusGuidelines?: CourseStoreLink;
}

export interface CourseStore extends CourseStoreData {
  linkCanvasDiscussion?: CourseStoreLink;
}

export default CourseStore;
