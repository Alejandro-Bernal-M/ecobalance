import { invoiceType } from "@/redux/features/invoiceSlice"
import { deleteInvoice } from "@/redux/features/invoiceSlice"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import { TiDeleteOutline } from 'react-icons/ti'
import styles from './InvoiceComponent.module.css'
import { alertType } from "@/redux/features/alertSlice"
// import { Date } from "mongoose";

type invoiceProps = {
  date: Date,
  service: string,
  amount: number,
  consumption: number,
  _id: string,
  alerts: alertType[] 
}

function InvoiceComponent({date, service, amount, consumption, _id, alerts}: invoiceProps) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const minAlert = (Math.min(...alerts.map((alert:alertType) => alert.amount)));
  const handleClick = () => {
    dispatch(deleteInvoice(_id))
  }
  function formatDate(date : string){
    const originalDate = new Date(date);
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1.
    const year = originalDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  function metricValue(service:string) {
    switch(service){
      case 'water':
        return 'm3'
      case 'gas':
        return 'm3'
      case 'electricity':
        return 'Kwh'
    }
  }

  return (
    <div className={styles.invoice} >
      <div className={styles.invoice_div}>
        <p className={styles.invoice_p} >Valor del pago:</p>
        <p className={styles.invoice_p}> <span>{amount}</span></p>
      </div>
      <div className={styles.invoice_div}>
        <p className={styles.invoice_p} >Consumo: </p>
        <p className={styles.invoice_p}>{consumption > minAlert ? <span className= "alert" > {consumption} </span> : <span >{consumption} </span> }{metricValue(service)}</p>
      </div>
      <div className={styles.invoice_div}>
        <p className={styles.invoice_p} >Fecha: </p>
        <p className={styles.invoice_p}><span>{formatDate(date.toString())}</span></p>
      </div>
      <TiDeleteOutline className={styles.delete_icon} onClick={handleClick} />
    </div>
  )
}

export default InvoiceComponent