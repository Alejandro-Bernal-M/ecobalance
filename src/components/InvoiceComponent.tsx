import { invoiceType } from "@/redux/features/invoiceSlice"

function InvoiceComponent({date, service, amount, consumption, _id}: invoiceType) {
  const handleClick = () => {
    console.log(_id)
  }
  return (
    <div >
      <p>servicio: {service}</p>
      <p>pago: {amount}</p>
      <p>consumo: {consumption}</p>
      <p>fecha: {date.toString()}</p>
      <button onClick={handleClick}>Eliminar</button>
    </div>
  )
}

export default InvoiceComponent