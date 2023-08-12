import CourseStoreImpl from "@/stores/CourseStore";
import AppStore, { AppStoreData } from "@/types/AppStore";
import CourseStore, { CourseStoreData } from "@/types/CourseStore";
import { computed, makeObservable, observable } from "mobx";

class AppStoreImpl implements AppStore {
  @observable testServerTime: Date;

  @observable courseStore: CourseStore;

  constructor(initialData: AppStoreData) {
    ({ testServerTime: this.testServerTime } = initialData);

    this.courseStore = new CourseStoreImpl(initialData.courseStoreData);

    makeObservable(this);
  }

  @computed
  get courseStoreData() {
    return this.courseStore;
  }
}

export default AppStoreImpl;
