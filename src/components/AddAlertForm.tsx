import React from "react"
import toast from "react-hot-toast";
import { addAlert } from "@/redux/features/alertSlice";
import { useDispatch } from "react-redux/es/exports";
import {ThunkDispatch} from "@reduxjs/toolkit";

function AddAlertForm({user}: any) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const service = formData.get('service-select');
    const amount = formData.get('amount');


    if(!service || !amount ) return toast.error("Debes llenar todos los campos");

    const body = {
      service,
      amount,
      "user_id": user._id
    }
    e.currentTarget.reset();
    
    dispatch(addAlert(body))
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="service-select"> Seleccione el servicio </label>
      <select name="service-select" defaultValue={''}>
        <option value="" ></option>
        <option value="water" id="water">Agua</option>
        <option value="gas" id="gas">Gas</option>
        <option value="electricity" id="electricity">Electricidad</option>
      </select>
      <label htmlFor="amount"> Valor de la alerta </label>
      <input type="number" name="amount" placeholder="" />
      <button>
        Añadir
      </button>
    </form>
  )
}

export default AddAlertForm