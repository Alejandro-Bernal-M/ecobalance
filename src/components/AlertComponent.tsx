import { alertType } from "@/redux/features/alertSlice"
import { deleteAlert } from "@/redux/features/alertSlice"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"

function AlertComponent({ amount, service, _id}: alertType) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const handleClick = () => {
    dispatch(deleteAlert(_id))
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
      <p>alerta en : {amount} {metricValue(service)}</p>
      <button onClick={handleClick}>Eliminar</button>
    </div>
  )
}

export default AlertComponent