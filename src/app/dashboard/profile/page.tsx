'use client'

import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getInvoices } from "@/redux/features/invoiceSlice";
import { useEffect, useState } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { invoiceType } from "@/redux/features/invoiceSlice";
import { Date } from "mongoose";

function Dashboard() {
  const { data: session } = useSession();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const invoices = useSelector((store: any) => store.invoice.invoices);

  const [waterInvoices, setWaterInvoices] = useState<invoiceType[]>([]);
  const [gasInvoices, setGasInvoices] = useState<invoiceType[]>([]);
  const [electricityInvoices, setElectricityInvoices] = useState<invoiceType[]>([]);

  
  
  useEffect(() => {
    
    if(session?.user){
      const userId = (session?.user as { _id: string })._id;
      dispatch(getInvoices(userId));
    }
    
    
  }, [session, dispatch]);
  
  useEffect(() => {

    function orderByDate(dateA:Date, dateB:Date){
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    }
    
    const waterArray = invoices
    .filter((invoice: invoiceType) => invoice.service === 'water')
    .sort((a: invoiceType, b: invoiceType) => orderByDate(a.date, b.date));
    setWaterInvoices(waterArray);

    const gasArray = invoices
    .filter((invoice:invoiceType) => invoice.service == 'gas')
    .sort((a: invoiceType, b: invoiceType) => orderByDate(a.date, b.date));
    setGasInvoices(gasArray);

    const electricityArray = invoices
    .filter((invoice:invoiceType) => invoice.service == 'electricity')
    .sort((a: invoiceType, b: invoiceType) => orderByDate(a.date, b.date));
    setElectricityInvoices(electricityArray);

  }, [invoices])

  return (
    <div>
      <h1>Perfil</h1>

      <p>Nombre: {session?.user?.name}</p>
      <p>Correo electrónico: {session?.user?.email}</p>

      <pre>
        {JSON.stringify(
          {session
         },
           null, 2)}
      </pre>
      
      <h2>Registros de Agua</h2>
      { waterInvoices.length > 0 ? (waterInvoices.map((invoice: invoiceType) => (
        <div key={invoice._id}>
          <p>servicio: {invoice.service}</p>
          <p>pago: {invoice.amount}</p>
          <p>consumo: {invoice.consumption}</p>
          <p>fecha: {invoice.date.toString()}</p>
        </div>
      ))) : <p>Sin registros</p> }

      <h2>Registros de Gas</h2>
      { gasInvoices.length > 0 ? (gasInvoices.map((invoice: invoiceType) => (
        <div key={invoice._id}>
          <p>servicio: {invoice.service}</p>
          <p>pago: {invoice.amount}</p>
          <p>consumo: {invoice.consumption}</p>
          <p>fecha: {invoice.date.toString()}</p>
        </div>
      ))):  <p>Sin registros</p> }

      <h2>Registros de Electricidad</h2>
      {electricityInvoices.length > 0 ? (electricityInvoices.map((invoice: invoiceType) => (
        <div key={invoice._id}>
          <p>servicio: {invoice.service}</p>
          <p>pago: {invoice.amount}</p>
          <p>consumo: {invoice.consumption}</p>
          <p>fecha: {invoice.date.toString()}</p>
        </div>
      ))): <p>Sin registros</p>}
    </div>
    )
}

export default Dashboard