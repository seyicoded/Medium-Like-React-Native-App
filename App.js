import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';

import * as Font from "expo-font";

import SplashScreen from './source/SplashLoader'
import MainNavigator from './source/MainNavigator'

// import {initnotify} from 'expo-push-notification-helper'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export default function App() {

  const [hideSplashScreen, sethideSplashScreen] = useState(false);

  const initnotify = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
           if (status != "granted") {
                 alert('you need to enable notification permission in settings')
                 return false;
           } else {
               Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                sound: true,
                });
                 Notifications.setNotificationChannelAsync('reminders', {
                  name: 'Reminders',
                  priority: 'max',
                  vibrate: [0, 250, 250, 250],
                  sound: true,
                });
                 Notifications.setNotificationChannelAsync('chat-messages', {
                  name: 'Chat messages',
                  sound: true,
                });
              return true;
            }
  }

  useEffect(() => {

    const _loadFontsAsync = async () => {
        let isLoaded = await Font.loadAsync({
          // add as many fonts as you want here .... 
          'Lato': require("./assets/resource/font/Lato-Regular.ttf")
        });
        
        console.log('font:' +isLoaded);

        setTimeout(function(){
          sethideSplashScreen(true)
        },4000);
    };

    _loadFontsAsync()

    try{
      initnotify()
    }catch(e){

    }
  }, [])

  if(!hideSplashScreen){
    return <SplashScreen />
  }else{
    // return <SplashScreen />
    return <MainNavigator />
  }
}
