
import React, { FC, useEffect } from 'react'
import './NotificationComponent.css'
import { Notification } from '../../models/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../../redux/selectors/selectors'
import { REMOVE } from '../../redux/types/action'
interface NotificationComponentProps {

}
const NotificationComponent: FC<NotificationComponentProps> = () => {
    const notifications = useSelector(getNotifications)
    const dispatch = useDispatch()
    useEffect(() => {
        const runLocalData = () => {
            notifications.map((notification: Notification) => {
                setTimeout(() => {
                    dispatch({
                        type: REMOVE,
                        payload: notification
                    })
                }, notification?.timeout || 2000)

            })
        }

        window.scrollTo(0, 0)
        runLocalData()
    })


    const handleDelete = (notification: Notification) => {



        dispatch({
            type: REMOVE,
            payload: notification
        })
    }
    return (


        <div className='NotificationComponent'>
            {

                notifications.map((notification: Notification) => (

                    <div className={`alert alert-${notification.status} alert-dismissible fade show`} role="alert">
                        {notification.message}
                        <button
                            onClick={() => handleDelete(notification)}

                            type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                ))


            }



        </div>
    )
}

export default NotificationComponent