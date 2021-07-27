import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useEffect, useState} from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import * as CONFIG from '../../CONFIG'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Houser from './Houser'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    }),
});

if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  axios.interceptors.response.use(response => {
    //console.log(response+"")
    return response;
    }, error_sent_app_container => {
        
        console.log(error_sent_app_container)
    return error_sent_app_container;
});

export default function AppContainer({navigation, route}) {
    const context = React.useContext(CONFIG.AppContext);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [isLoading, setisLoading] = useState(true)
    const [user_state, setuser_state] = useState(null) //blocked || unactivated || okay
    const [showError, setshowError] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [all_categories, setall_categories] = useState([])
    const [all_articles, setall_articles] = useState([])

    //to check data from database and update context state then also register push token

    const error = (msg)=>{
        setisLoading(false)
        setAlertMessage(msg)
        setshowError(true)
    }

    // console.log(isLoading+ user_state)

    const user_data_fil = async ()=>{
        setisLoading(true)
        const user_id = await AsyncStorage.getItem('user_id')
        try{
            const fd = {
                'api_key' : CONFIG.API_KEY,
            };

            const data = await axios.post(`${CONFIG.BASE_URL}user-information/${user_id}`, fd)

            const res = (data.data)

            // console.log(res)

            if(res.data[0].status == 1){
                //load data to sync, then just call a single context to refresh
                await AsyncStorage.setItem('user_email',res.data[0].email+'')
                await AsyncStorage.setItem('user_name',res.data[0].name+'')
                await AsyncStorage.setItem('image',res.data[0].photo_url+'')

                // console.log(res)
                setall_articles(res.articles)
                setall_categories(res.categories)

                //update context
                const isSignedIn = context[0].id;
                context[1].setid(isSignedIn)

                setuser_state('okay')

            }else if(res.data[0].status == 2){
                //user blocked
                setuser_state('blocked')
            }else if(res.data[0].status == 0){
                //user unactivated
                setuser_state('unactivated')
            }
        }catch(e){
            error('network issues')
            console.log(e)
        }
    }

    const send_to_server = async (token)=>{
        console.log(context[0].id)
        const fd = {
            'device_token' : token,
            'account_mode' : 'user_app',
            'account_id' : context[0].id,
            'device_type' : Platform.OS,
            'api_key': CONFIG.API_KEY,
        };

        axios.post(`${CONFIG.BASE_URL}reg-push-token`, fd).then(res => {})
        //
    }

    const register_token = ()=> {
        
        try{
            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token)
                send_to_server(token)
                // console.log(token+': token_reached');
            });
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        try{
            user_data_fil()
            // setisLoading(false)
        }catch(e){
            console.log('error from appcontainer'+ e)
        }
        
    }, [])

    useEffect(()=>{
        //checker
        if(user_state == 'okay'){
            register_token()
            setisLoading(false)
            // navigation.navigate('Houser')
        }else if(user_state == 'unactivated'){
            //nav to unactivated
            setisLoading(false)
            navigation.navigate('stack_OTP_PAGE', {fromRegistraion: false})

        }else if(user_state == 'blocked'){
            //nav to blocked:: stack_screen_BLOCKED
            setisLoading(false)
            navigation.navigate('stack_screen_BLOCKED')
        }

        console.log('reached_user_state: '+user_state);
    },[user_state])

    if(showError){
        return (
            <View style={{flex: 1}}>
                <CONFIG.ALERT.Alert type="error" message={AlertMessage} hideModal={setshowError} />
            </View>
        )
    }

    if(isLoading){
        return (
        <View style={{flex: 1}}>
            <CONFIG.ALERT.Loader />
        </View>
        );
    }else if((user_state != 'okay') && !(isLoading)){
        //redirect-to-user-app
        return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: CONFIG.Primary_color}}>
            <Text style={{color: 'white'}}><TouchableOpacity onPress={()=>{user_data_fil()}}><Text style={{color: 'white'}}>CLICK TO TRY AGAIN</Text></TouchableOpacity></Text>
            <Text />
            <Text style={{color: 'white'}}><TouchableOpacity onPress={()=>{
                (async()=>{
                    await AsyncStorage.clear();
                    context[1].setid(null)
                })()
            }}><Text style={{color: 'white'}}>RESET APP</Text></TouchableOpacity></Text>
            </View>)
    }

    if((user_state == 'okay') && !(isLoading)){
        // navigation.navigate('Houser')
        return <Houser navigation={navigation} route={route} all_articles={all_articles} all_categories={all_categories} />
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: CONFIG.Primary_color}}>
            <Text style={{color: 'white'}}><TouchableOpacity onPress={()=>{user_data_fil()}}><Text style={{color: 'white'}}>CLICK TO TRY AGAIN</Text></TouchableOpacity></Text>
            <Text />
            <Text style={{color: 'white'}}><TouchableOpacity onPress={()=>{
                (async()=>{
                    await AsyncStorage.clear();
                    context[1].setid(null)
                })()
            }}><Text style={{color: 'white'}}>RESET APP</Text></TouchableOpacity></Text>
            </View>)
}

const registerForPushNotificationsAsync = async ()=>{
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
}