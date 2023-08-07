import { AssertionError } from "assert";

import CourseDataStore, {
  CourseDataStoreLinkKey,
} from "@/types/CourseDataStore";

export interface AppStore {
  courseDataStore: CourseDataStore;
}

export default AppStore;
