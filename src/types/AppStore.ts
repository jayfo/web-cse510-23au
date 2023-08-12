import CourseStore, { CourseStoreData } from "@/types/CourseStore";

export interface AppStoreData {
  courseStoreData: CourseStoreData;

  testServerTime: Date;
}

export interface AppStore extends AppStoreData {
  courseStore: CourseStore;
}

export default AppStore;
