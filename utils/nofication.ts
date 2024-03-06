import PushNotification, { Importance } from "react-native-push-notification";
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
export function localNotificationSchedule(){
    PushNotification.localNotificationSchedule({
        title:'Demo push nofications',
        message:'Alo test thôi',
        channelId:`channel-id`,
        date:new Date(Date.now()+1800),
        allowWhileIdle:false,
        repeatTime:2,
        repeatType:'day'
    })
}
export function createChannel(){
    PushNotification.createChannel({
        channelId:`channel_ID`,
        channelName:'channel_id_demo',
        channelDescription: `Demo for create channel `,
        playSound:false,
        soundName:"default",
        importance:Importance.HIGH,
        vibrate:true
    },(create)=>{
        console.log(`create channel : ${create}`)
    })
}
export function InitNotifications(){
    PushNotification.popInitialNotification((nofications)=>{
        console.log('notificaitons:',nofications);
    })
}
