'use client'

import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getInvoices } from "@/redux/features/invoiceSlice";
import { useEffect } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";

function Dashboard() {
  const { data: session } = useSession();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const invoices = useSelector((store: any) => store.invoice.invoices);

  
  useEffect(() => {
    if (session?.user) {
      if(session?.user){
        const userId = (session?.user as { _id: string })._id;
        dispatch(getInvoices(userId));
      }
    }
  }, [session, dispatch]);

  console.log(invoices)
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

      {invoices.map((invoice: any) => (
        <div key={invoice._id}>
          <p>servicio: {invoice.service}</p>
          <p>pago: {invoice.amount}</p>
          <p>consumo: {invoice.consumption}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard