import { AssertionError } from "assert";

export type CourseDataStoreLink = string;

const CourseDataStoreLinkKeyValues = [
  "linkCanvas",
  "linkGitHub",
  "linkUniversitySyllabusGuidelines",
] as const;
export type CourseDataStoreLinkKey =
  (typeof CourseDataStoreLinkKeyValues)[number];

export function assertIsCourseDataStoreLinkKey(
  courseDataStoreLinkKey: any,
): asserts courseDataStoreLinkKey is CourseDataStoreLinkKey {
  if (!CourseDataStoreLinkKeyValues.includes(courseDataStoreLinkKey)) {
    throw new AssertionError({ message: "Invalid CourseDataStoreLinkKey" });
  }
}

export interface CourseDataStore {
  linkCanvas?: CourseDataStoreLink;
  linkGitHub?: CourseDataStoreLink;
  linkUniversitySyllabusGuidelines?: CourseDataStoreLink;
}

export default CourseDataStore;
