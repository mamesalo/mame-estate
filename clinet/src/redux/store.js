// import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";
// // import { persistReducer, persistStore } from "redux-persist";
// // import { storage } from "redux-persist/lib/storage";

// // const rootReducer=combineReducers({user: userReducer})

// // const PersistConfig={
// //     key: 'root',
// //     storage,
// //     version: 1,
// // }
// // const persistedReducer=persistReducer(PersistConfig,rootReducer)
// export const store = configureStore({
//  // reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export const persistor=persistStore(store);
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import userReducer from "./user/userSlice";

// export const store = configureStore({
//   reducer: { user: userReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
