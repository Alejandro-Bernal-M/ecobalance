import { invoiceType } from "@/redux/features/invoiceSlice"
import { deleteInvoice } from "@/redux/features/invoiceSlice"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"

function InvoiceComponent({date, service, amount, consumption, _id}: invoiceType) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const handleClick = () => {
    dispatch(deleteInvoice(_id))
  }
  return (
    <div >
      <p>pago: {amount}</p>
      <p>consumo: {consumption}</p>
      <p>fecha: {date.toString()}</p>
      <button onClick={handleClick}>Eliminar</button>
    </div>
  )
}

export default InvoiceComponent