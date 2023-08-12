import "server-only";

import { AppStoreData } from "@/types/AppStore";
import initialCourseStoreData from "@/data/CourseData"

export function appStoreInitialData(): AppStoreData {
  return {
    courseStoreData: initialCourseStoreData,
  };
}

export default appStoreInitialData;
