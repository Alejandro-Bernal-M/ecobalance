import { configureStore } from "@reduxjs/toolkit";
import  invoiceSlice from "./features/invoiceSlice";
import alertSlice from "./features/alertSlice";

const store = configureStore({
  reducer:{
    invoice: invoiceSlice,
    alert: alertSlice
  }
})

export default store;