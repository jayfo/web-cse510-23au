import "server-only";

import initialCourseStoreData from "@/data/CourseData";
import { AppStoreData } from "@/types/AppStore";

export function appStoreInitialData(): AppStoreData {
  return {
    courseStoreData: initialCourseStoreData,
  };
}

export default appStoreInitialData;
