import { configureStore } from "@reduxjs/toolkit";
import  invoiceSlice from "./features/invoiceSlice";
import alertSlice from "./features/alertSlice";

export const store = configureStore({
  reducer:{
    invoice: invoiceSlice,
    alert: alertSlice
  }
})