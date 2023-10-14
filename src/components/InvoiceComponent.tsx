import { invoiceType } from "@/redux/features/invoiceSlice"
import { deleteInvoice } from "@/redux/features/invoiceSlice"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"

function InvoiceComponent({date, service, amount, consumption, _id}: invoiceType) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
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
    <div >
      <p>pago: {amount}</p>
      <p>consumo: {consumption} {metricValue(service)}</p>
      <p>fecha: {formatDate(date.toString())}</p>
      <button onClick={handleClick}>Eliminar</button>
    </div>
  )
}

export default InvoiceComponent