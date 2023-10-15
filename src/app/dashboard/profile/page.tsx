'use client'

import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getInvoices } from "@/redux/features/invoiceSlice";
import { getAlerts } from "@/redux/features/alertSlice";
import { useEffect, useState } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { invoiceType } from "@/redux/features/invoiceSlice";
import { alertType } from "@/redux/features/alertSlice";
import { Date } from "mongoose";
import InvoiceComponent from "@/components/InvoiceComponent";
import AlertComponent from "@/components/AlertComponent";
import AddInvoiceForm from "@/components/AddInvoiceForm";
import AddAlertForm from "@/components/AddAlertForm";
import styles from './profile.module.css'

function Dashboard() {
  const { data: session } = useSession();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const invoices = useSelector((store: any) => store.invoice.invoices);
  const loadingInvoices = useSelector((store: any) => store.invoice.loading);
  const alerts = useSelector((store:any) => store.alert.alerts)
  const loadingAlerts = useSelector((store:any) => store.alert.loading );

  const [waterInvoices, setWaterInvoices] = useState<invoiceType[]>([]);
  const [gasInvoices, setGasInvoices] = useState<invoiceType[]>([]);
  const [electricityInvoices, setElectricityInvoices] = useState<invoiceType[]>([]);
  
  const [waterAlerts, setWaterAlerts] = useState<alertType[]>([]);
  const [gasAlerts, setGasAlerts] = useState<alertType[]>([]);
  const [electricityAlerts, setElectricityAlerts] = useState<alertType[]>([]);


  
  
  useEffect(() => {
    
    if(session?.user){
      const userId = (session?.user as { _id: string })._id;
      dispatch(getInvoices(userId));
      dispatch(getAlerts(userId));
    }
    
    
  }, [session, dispatch]);
  
  useEffect(() => {
    //function to order en descending order  (most recent first)
    function orderByDate(dateA:Date, dateB:Date){
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    }

   if(!loadingInvoices){ const waterArray = invoices
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
  }

  }, [invoices, loadingInvoices])


  useEffect(() => {
    if(!loadingAlerts){
      const waterArray = alerts
      .filter((alert:alertType) => alert.service == 'water');
      setWaterAlerts(waterArray);
      
      const gasArray = alerts
      .filter((alert:alertType) => alert.service == 'gas');
      setGasAlerts(gasArray);
      
      const electricityArray = alerts
      .filter((alert:alertType) => alert.service == 'electricity');
      setElectricityAlerts(electricityArray);
    }
  }, [alerts, loadingAlerts])


  return (
    <section className={styles.profile_section}>
      <h1>Perfil</h1>
      <div className={styles.profile_div}>
        <p>Bienvenido de nuevo : {session?.user?.name}</p>
        <p>Correo electrónico: {session?.user?.email}</p>
      </div>
      <h2>Agregar Factura</h2>
      <AddInvoiceForm user={session?.user} />

      <AddAlertForm user={session?.user} />
      
      <h2>Registros de Agua</h2>
      <h3>alertas</h3>
      { waterAlerts.length > 0 ? (waterAlerts.map((alert: alertType) => (
        <AlertComponent key={alert._id}
          service={alert.service}
          amount={alert.amount}
          _id={alert._id}
         />
      ))):  <p>Sin alerta para agua.</p>}

      { waterInvoices.length > 0 ? (waterInvoices.map((invoice: invoiceType) => (
        <InvoiceComponent
          key={invoice._id}
          consumption={invoice.consumption}
          date={invoice.date}
          service={invoice.service}
          amount={invoice.amount} 
          _id ={invoice._id}
        />
      ))) : <p>Sin registros</p> }

      <h2>Registros de Gas</h2>
      <h3>alertas</h3>
      { gasAlerts.length > 0 ? (gasAlerts.map((alert: alertType) => (
        <AlertComponent key={alert._id}
          service={alert.service}
          amount={alert.amount}
          _id={alert._id}
        />
      ))):  <p>Sin alerta para gas.</p>}

      { gasInvoices.length > 0 ? (gasInvoices.map((invoice: invoiceType) => (
        <InvoiceComponent
          key={invoice._id}
          consumption={invoice.consumption}
          date={invoice.date}
          service={invoice.service}
          amount={invoice.amount} 
          _id ={invoice._id}
        />
      ))):  <p>Sin registros</p> }

      <h2>Registros de Electricidad</h2>
      <h3>alertas</h3>
      { electricityAlerts.length > 0 ? (electricityAlerts.map((alert: alertType) => (
       <AlertComponent key={alert._id}
        service={alert.service}
        amount={alert.amount}
        _id={alert._id}
        />
      ))):  <p>Sin alerta para electricidad.</p>}

      {electricityInvoices.length > 0 ? (electricityInvoices.map((invoice: invoiceType) => (
        <InvoiceComponent
          key={invoice._id}
          consumption={invoice.consumption}
          date={invoice.date}
          service={invoice.service}
          amount={invoice.amount} 
          _id ={invoice._id}
        />
      ))): <p>Sin registros</p>}
    </section>
    )
}

export default Dashboard