import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export type invoiceType = {
  _id: string,
  date: Date,
  consumption: number,
  service: 'water' | 'gas' | 'electricity',
  amount: number,
  user?: {},
}

type invoiceInitialStateType = {
  invoices: invoiceType[],
  loading: boolean,
  error: string | null,
}

const initialState = {
  invoices: [],
  loading: false,
  error: null,
} as invoiceInitialStateType


export const getInvoices = createAsyncThunk(
  'invoice/getInvoices',
  async (user_id:string) => {
  try {
    const response = await axios.get(`/api/invoices?user_id=${user_id}`)
    if(response.status == 200){
      return response.data
    }
  } catch (error) {
    if(error instanceof AxiosError){
      console.log(error);
      toast.error('Error conectando con el servidor');
      return;
    }
  }
  }
)

export const addInvoice = createAsyncThunk(
  'invoice/addInvoice',
  async (body: any) => {
    try {
      const response = await axios.post('/api/invoices', body)
      if(response.status == 200){
        toast.success('Factura Registrada');
        
      }else{
        toast.error('Error registrando factura')
      }
      return response.data
      
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error)
        let message = error.response?.data.message.split(':');
        toast.error(message[message.length - 1] || 'Ha ocurrido un error');
        return;
      }
    }
  }
)

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoice_id: string) => {
    try {
      const response = await axios.delete(`/api/invoices?invoice_id=${invoice_id}`);

      if(response.status == 200){
        toast.success('Factura Eliminada');
        
      }else{
        toast.error('Error eliminando factura')
      }
      return response.data
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error)
        let message = error.response?.data.message.split(':');
        toast.error(message[message.length - 1] || 'Ha ocurrido un error');
        return;
      }
    }
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
    builder.addCase(addInvoice.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addInvoice.fulfilled, (state, action) => {
      const newInvoice = action.payload.savedInvoice;
      const invoices = [
        ...state.invoices,
        newInvoice
      ]
      state.invoices = invoices;
      state.loading = false;
    })
    builder.addCase(addInvoice.rejected, (state, action) => {
      state.error = 'Error guardando la factura'
    })
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      const deletedInvoice = action.payload.deletedInvoice;
      const newInvoices = state.invoices.filter((invoice: invoiceType) => invoice._id != deletedInvoice._id )
      state.invoices = newInvoices
      state.loading = false
    })
    builder.addCase(deleteInvoice.rejected, (state) => {
      state.error = 'Error eliminando la factura'
    })
  }
})

export default invoiceSlice.reducer;