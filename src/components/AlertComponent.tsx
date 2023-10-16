import { alertType } from "@/redux/features/alertSlice"
import { deleteAlert } from "@/redux/features/alertSlice"
import { useDispatch } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import styles from './AlertComponent.module.css'
import { TiDeleteOutline } from 'react-icons/ti'

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
    <div className={styles.alert}>
      <p className={styles.alert_p}>Alerta en : <span>{amount} {metricValue(service)}</span></p>
      <TiDeleteOutline className={styles.delete_icon} onClick={handleClick} />
    </div>
  )
}

export default AlertComponent