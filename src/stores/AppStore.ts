import CourseDataStoreImpl from "@/stores/CourseDataStore";
import AppStore from "@/types/AppStore";
import CourseDataStore from "@/types/CourseDataStore";
import {makeObservable, observable} from "mobx";

class AppStoreImpl implements AppStore {
  @observable courseDataStore: CourseDataStore;

  constructor() {
    this.courseDataStore = new CourseDataStoreImpl();

    makeObservable(this);
  }
}

export default AppStoreImpl;
