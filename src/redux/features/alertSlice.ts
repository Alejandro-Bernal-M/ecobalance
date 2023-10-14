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
  }
})

export default alertSlice.reducer