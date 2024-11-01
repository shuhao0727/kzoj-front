import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./states/auth";

const storage: Storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : {
        getItem() {
          return Promise.resolve(null);
        },
        setItem(_, value) {
          return Promise.resolve(value);
        },
        removeItem() {
          return Promise.resolve();
        },
      };

export const store = configureStore({
  reducer: {
    auth: persistReducer({ key: "kzoj-auth", storage }, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
