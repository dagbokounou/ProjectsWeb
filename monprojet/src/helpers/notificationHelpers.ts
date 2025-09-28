import { Notification } from "../models/Notification"



export const emitNotification = (dispatch: (data: any) => void, message: string, type: any, status: string = 'success', timeout: number = 2000) => {

    let notification: Notification = {
        _id: (Math.random() * 415356).toString(),
        message: message,
        status: status



    }

    dispatch({
        type: type,
        payload: notification
    })


}