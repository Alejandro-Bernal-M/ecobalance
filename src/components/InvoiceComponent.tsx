import { invoiceType } from "@/redux/features/invoiceSlice"

function InvoiceComponent({date, service, amount, consumption}: invoiceType) {
  return (
    <div >
          <p>servicio: {service}</p>
          <p>pago: {amount}</p>
          <p>consumo: {consumption}</p>
          <p>fecha: {date.toString()}</p>
        </div>
  )
}

export default InvoiceComponent