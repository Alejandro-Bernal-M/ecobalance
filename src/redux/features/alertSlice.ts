import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios, {AxiosError} from 'axios';
// import { Date } from 'mongoose';
// import toast from 'react-hot-toast';

type alertType = {
  amount: number,
  user_id: string,
  service: 'water' | 'gas' | 'electricity'
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

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {}
})

export default alertSlice.reducer