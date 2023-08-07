/**
 * Based on https://mobx-react.js.org/recipes-context
 */

import * as React from "react";

import AppStoreImpl from "@/stores/AppStore";
import AppStore from "@/types/AppStore";
import { assertNotNull } from "@/types/Guards";
import { useLocalObservable } from "mobx-react";

/*
 * The actual AppStore.
 */
let INSTANCE: AppStore | null = null;

export function createAppStore(): AppStore {
  if (INSTANCE) {
    throw new Error("AppStore is a singleton.");
  }

  INSTANCE = new AppStoreImpl();

  assertNotNull(INSTANCE);

  return INSTANCE;
}

/*
 * AppStoreProvider for creating a context to access the AppStore.
 */
const storeContext = React.createContext<AppStore | null>(null);

export interface AppStoreProviderProps extends React.PropsWithChildren<{}> {}

export const AppStoreProvider = ({
  children,
}: AppStoreProviderProps): React.ReactElement => {
  const store = useLocalObservable((): AppStore => {
    if (INSTANCE === null) {
      throw new Error("AppStore not created.");
    }

    return INSTANCE;
  });

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

/*
 * Hook for accessing the AppStore.
 */
export const useAppStore = () => {
  const store = React.useContext(storeContext);

  if (!store) {
    throw new Error("useAppStore must be called within an AppStoreProvider.");
  }

  return store;
};

export default AppStoreProvider;
