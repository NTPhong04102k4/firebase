import PushNotification from "react-native-push-notification";

export function PushLocal(title: string,message: string){
    PushNotification.localNotification({
        title:title,
        message:message,
        id:0,
        channelId:'chanel_id_1'
    })
}
export function SchdulePush(title:string,message:string){
    PushNotification.scheduleLocalNotification({
        title:title,
        message:message,
        date:new Date(Date.now()+3600)
    })
}
export function CancerPushNotification(){
    PushNotification.cancelAllLocalNotifications();
}