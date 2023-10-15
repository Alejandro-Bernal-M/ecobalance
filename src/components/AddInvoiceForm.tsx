import React from "react"
import toast from "react-hot-toast";
import { addInvoice } from "@/redux/features/invoiceSlice";
import { useDispatch } from "react-redux/es/exports";
import {ThunkDispatch} from "@reduxjs/toolkit";
import styles from './addInvoiceForm.module.css'

function AddInvoiceForm({user}: any) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const service = formData.get('service-select');
    const amount = formData.get('amount');
    const consumption = formData.get('consumption');
    const date = formData.get("date");

    if(!service || !amount || !consumption || !date) return toast.error("Debes llenar todos los campos");

    const body = {
      service,
      amount,
      consumption,
      date,
      "user_id": user._id
    }
    e.currentTarget.reset();
    
    dispatch(addInvoice(body))
    
    
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.form_div}>
        <label htmlFor="service-select"> Seleccione el servicio </label>
        <select name="service-select" defaultValue={''}>
          <option value="" ></option>
          <option value="water" id="water">Agua</option>
          <option value="gas" id="gas">Gas</option>
          <option value="electricity" id="electricity">Electricidad</option>
        </select>
      </div>

      <div className={styles.form_div}>
        <label htmlFor="consumption"> Consumo total </label>
        <input type="number" name="consumption" placeholder="" />
      </div>

      <div className={styles.form_div}>
        <label htmlFor="amount"> Valor del recibo </label>
        <input type="number" name="amount" placeholder="" />
      </div>

      <div className={styles.form_div}>
        <label htmlFor="date"> Fecha del recibo </label>
        <input type="date" name="date" />
      </div>

      <button>
        Añadir
      </button>
    </form>
  )
}

export default AddInvoiceForm