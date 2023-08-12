import "server-only";

import { AppStoreData } from "@/types/AppStore";

export function appStoreInitialData(): AppStoreData {
  return {
    courseStoreData: {
      linkCanvas: "",
      linkGitHub: "",
      linkUniversitySyllabusGuidelines: "",
    },

    testServerTime: new Date(),
  };
}

export default appStoreInitialData;
