import CourseStore, {
  CourseStoreData,
  CourseStoreLink,
} from "@/types/CourseStore";
import {computed, makeObservable, observable} from "mobx";

export class CourseStoreImpl implements CourseStore {
  @observable linkCanvas?: CourseStoreLink;
  @observable linkGitHub?: CourseStoreLink;
  @observable linkUniversitySyllabusGuidelines?: CourseStoreLink;

  constructor(initialData: CourseStoreData) {
    ({
      linkCanvas: this.linkCanvas,
      linkGitHub: this.linkGitHub,
      linkUniversitySyllabusGuidelines: this.linkUniversitySyllabusGuidelines,
    } = initialData);

    makeObservable(this);
  }

  @computed
  get linkCanvasDiscussion(): CourseStoreLink | undefined {
    if (this.linkCanvas) {
      return this.linkCanvas + '/discussion_topics';
    } else {
      return undefined;
    }
  }
}

export default CourseStoreImpl;
