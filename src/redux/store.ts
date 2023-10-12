import { configureStore } from "@reduxjs/toolkit";
import  invoiceSlice from "./features/invoiceSlice";

export const store = configureStore({
  reducer:{
    invoice: invoiceSlice,
  }
})