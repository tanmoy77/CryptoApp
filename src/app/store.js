import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/CryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});
