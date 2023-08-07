import CourseDataStore from "@/types/CourseDataStore";
import {makeObservable, observable} from "mobx";

export class CourseDataStoreImpl implements CourseDataStore {
  @observable linkCanvas = undefined;
  @observable linkGitHub = undefined;
  @observable linkUniversitySyllabusGuidelines = undefined;

  constructor() {
    makeObservable(this);
  }
}

export default CourseDataStoreImpl;
