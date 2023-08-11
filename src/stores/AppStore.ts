import CourseStoreImpl from "@/stores/CourseStore";
import AppStore from "@/types/AppStore";
import CourseStore from "@/types/CourseStore";
import { makeObservable, observable } from "mobx";

class AppStoreImpl implements AppStore {
  @observable courseDataStore: CourseStore;

  constructor() {
    this.courseDataStore = new CourseStoreImpl();

    makeObservable(this);
  }
}

export default AppStoreImpl;
