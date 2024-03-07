import PushNotification, { Importance } from "react-native-push-notification";
const deleteChannelId=(id:number,nameChannel:string)=>PushNotification.deleteChannel(`channelId${id}`)


const  PushLocalNotifications=(id:number,title: string,message: string)=>
    PushNotification.localNotification({
        title,
        message,
        soundName:'default',
        playSound:true,
        channelId:`channelId${id}`,
        id
    })

const CancerAllLocalNotification=PushNotification.cancelAllLocalNotifications();

const localNotificationSchedule = (id:number, title:string, message:string, allowWhileIdle:boolean, repeatTime:number, repeatType:any) => {
    const validRepeatTypes = ['hour', 'week','time','minute','day'];
    const formattedRepeatType = repeatType ? (validRepeatTypes.includes(repeatType) ? repeatType : undefined) : undefined;

    PushNotification.localNotificationSchedule({
      title,
      message,
      channelId: `channelId${id}`,
      date: new Date(Date.now() + 1800), // Adjust time as needed
      allowWhileIdle,
      repeatTime,
      repeatType: formattedRepeatType,
      id,
    });
  };
  
const createChannel=(id:number,nameChannel:string,desc:string ,SoundName:string)=>{
    PushNotification.createChannel({
        channelId:`channel_ID_${id}`,
        channelName:nameChannel,
        channelDescription: desc,
        playSound:true,// set up sound for notifications.
        soundName:SoundName?(SoundName!==""?SoundName:undefined):undefined,// pass file name.mp3 (âm thanh thông báo là âm thanh của file mp3)
        importance:Importance.HIGH,
        vibrate:true
    },(create)=>{
        console.log(`create channel : ${create}`)// nếu channelId đã có thì sẽ trả về false.
    })
}
const InitNotifications=()=>
    PushNotification.popInitialNotification((nofications)=>{
        console.log('notificaitons:',nofications);
    })

export {PushLocalNotifications,localNotificationSchedule,InitNotifications,createChannel,CancerAllLocalNotification}