
import { Notification } from "../../models/Notification"
export const ADD = "ADD"
export const REMOVE = "REMOVE"
export const CLEAR = "CLEAR"
export interface NotificationAction {
    type: typeof ADD | typeof REMOVE | typeof CLEAR | null
    payload: Notification | null
}