import { AssertionError } from "assert";

import CourseStore, {
  CourseStoreLinkKey,
} from "@/types/CourseStore";

export interface AppStore {
  courseDataStore: CourseStore;
}

export default AppStore;
