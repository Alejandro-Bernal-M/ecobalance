import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type invoiceType = {
  _id: string,
  date: string,
  consumption: number,
  servide: 'water' | 'gas' | 'electricity',
  amount: number,
  user: {},
}

type initialStateType = {
  invoices: invoiceType[],
  loading: boolean,
  error: string | null,
}

const initialState = {
  invoices: [],
  loading: false,
  error: null,
} as initialStateType


export const getInvoices = createAsyncThunk(
  'invoice/getInvoices',
  async (user_id:string) => {
    const response = await axios.get(`/api/invoices?user_id=${user_id}`)
    return response.data
  }
)

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvoices.pending, (state, action) => {
      state.loading = true;
    }
    )
    builder.addCase(getInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.invoices = action.payload.invoices;
    }
    )
    builder.addCase(getInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error fetching invoices';
    }
    )
  }
  
})

export default invoiceSlice.reducer;