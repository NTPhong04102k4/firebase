import PushNotification, { Importance } from "react-native-push-notification";

const deleteChannelId=(id:number,nameChannel:string)=>PushNotification.deleteChannel(`channelId${id}`)
const  PushLocalNotifications=(title: string,message: string,soundName:string)=>

    PushNotification.localNotification({
        title,
        message,
        playSound: true, // (optional) default: true
      soundName: soundName, // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        channelId:`channel_Id_1_1`,
        vibrate:true,
        importance:'high',
  
        
    })



    const CancerAllLocalNotification=PushNotification.cancelAllLocalNotifications();

    const localNotificationSchedule=PushNotification.localNotificationSchedule({
      title:'Title:Notifications',
      message:'Message',
      channelId: `channel_Id_1`,
      date: new Date(Date.now() + 600000), // Adjust time as needed
      allowWhileIdle:true,
      repeatType: 'hour',
      soundName: 'hasaki.mp3',
      id:1,
      vibrate:true,
      playSound:true,
      vibration: 300,
      importance:'high'
    });
  
  

    const createChannel=PushNotification.createChannel({
        channelId:`channel_Id_1`,
        channelName:'channelId_1',
        channelDescription: 'mô tả thông báo',
        playSound:true,// set up sound for notifications.
        soundName:'hasaki.mp3',
        importance:Importance.HIGH,
        vibrate:true
    },(create)=>{
        console.log(`create channel : ${create}`)// nếu channelId đã có thì sẽ trả về false.
    })

const InitNotifications=()=>
    PushNotification.popInitialNotification((nofications)=>{
        console.log('notificaitons:',nofications);
    })

export {PushLocalNotifications,localNotificationSchedule,InitNotifications,createChannel,CancerAllLocalNotification}