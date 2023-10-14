import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export type alertType = {
  amount: number,
  user_id: string,
  service: 'water' | 'gas' | 'electricity',
  _id: string
}

type alertInitialStateType = {
  alerts: alertType[],
  loading: boolean,
  error: string
}

const initialState = {
  alerts: [],
  loading: false,
  error: ''
} as alertInitialStateType

export const getAlerts = createAsyncThunk(
  'alerts/getAlerts',
  async (user_id: string) =>{
    try {
      const response = await axios.get(`/api/alerts?user_id=${user_id}`);
      if(response.status == 200){
        return response.data
      }
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error);
        toast.error('Ha ocurrido un error');
        return;
      }
    }
  }
)

export const addAlert = createAsyncThunk(
  'alert/addAlert',
  async (body: any) => {
    try {
      const response = await axios.post('/api/alerts', body);
      if(response.status == 200){
        toast.success('Alerta creada')
      }else {
        toast.error('Error creando alerta')
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

export const deleteAlert = createAsyncThunk(
  'alert/deleteAlert',
  async (alert_id : string) => {
    try {
      const response = await axios.delete(`/api/alerts?alert_id=${alert_id}`);
      if(response.status == 200){
        toast.success('Alerta eliminada');
      }else {
        toast.error('Error eliminando alerta');
      }

      return response.data
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error);
        let message = error.response?.data.message.split(':');
        toast.error(message[message.length - 1] || 'Ha ocurrido un error');
        return;
      }
    }
  }
)

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlerts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAlerts.fulfilled, (state, action) => {
      state.alerts = action.payload.alerts;
      state.loading = false;
    })
    builder.addCase(getAlerts.rejected, (state) => {
      state.loading = false;
      state.error = 'Error fetching alerts';
    })
    builder.addCase(addAlert.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(addAlert.fulfilled, (state, action) => {
      const newAlert = action.payload.savedAlert
      const alertsArray = [
        ...state.alerts,
        newAlert
      ]
      state.alerts = alertsArray
      state.loading = false;
    })
    builder.addCase(addAlert.rejected, (state) => {
      state.loading = false;
      state.error = 'Error guardando alerta';
    })
    builder.addCase(deleteAlert.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(deleteAlert.fulfilled, (state, action) => {
      const deletedAlert = action.payload.deletedAlert
      const newArray = state.alerts.filter((alert) => alert._id != deletedAlert._id)
      state.alerts = newArray;
      state.loading = false;
    })
    builder.addCase(deleteAlert.rejected, (state) => {
      state.error = 'Error eliminando alerta';
    })
  }
})

export default alertSlice.reducer