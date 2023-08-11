import CourseStore from "@/types/CourseStore";
import { makeObservable, observable } from "mobx";

export class CourseStoreImpl implements CourseStore {
  @observable linkCanvas = undefined;
  @observable linkGitHub = undefined;
  @observable linkUniversitySyllabusGuidelines = undefined;

  constructor() {
    makeObservable(this);
  }
}

export default CourseStoreImpl;
