import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import * as CONFIG from './CONFIG'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { set } from 'react-native-reanimated'
import Display from './screens/guest/Display'
import Subscribe_Cat from './screens/universal/Subscribe_Cat'
import AppContainer from './screens/user/AppContainer'
import Houser from './screens/user/Houser'

export default function MainNavigator() {
    // AsyncStorage.clear(); 
    const [isStartFetching, setisStartFetching] = useState(true);
    const [FirstTimeOpeningApp, setFirstTimeOpeningApp] = useState('true');
    const [isSignedIn, setisSignedIn] = useState('false');
    const [username, setusername] = useState('false');
    const [email, setemail] = useState('false');
    const [id, setid] = useState('false');
    const [password, setpassword] = useState('false');
    const [currency, setcurrency] = useState('false');
    const [image, setimage] = useState('false');

    const [context, setContext] = useState([
        {FirstTimeOpeningApp,isSignedIn,username, email, id, password, currency, image, },
        {setFirstTimeOpeningApp,setisSignedIn,setusername, setemail, setid,setpassword, setcurrency, setimage}
    ])

    //start
    useEffect(() => {
        //get data from async storage
        const getDataFromAsync = async () =>{
          //get
          // await AsyncStorage.setItem('user_id',id+'')
          // await AsyncStorage.setItem('user_email',email+'')
          // await AsyncStorage.setItem('user_mobile',mobile+'')
          // await AsyncStorage.setItem('user_name',name+'')
          // await AsyncStorage.setItem('user_password',password+'')
          // await AsyncStorage.setItem('currency',currency+'')
          // await AsyncStorage.setItem('wallet',wallet+'')
          const ASS_FirstTimeOpeningApp = await AsyncStorage.getItem('FirstTimeOpeningApp')
          const ASS_user_id = await AsyncStorage.getItem('user_id')
          const ASS_user_email = await AsyncStorage.getItem('user_email')
          const ASS_user_name = await AsyncStorage.getItem('user_name')
          const ASS_user_password = await AsyncStorage.getItem('user_password')
          const ASS_currency = await AsyncStorage.getItem('currency')
          const ASS_image = await AsyncStorage.getItem('image')
  
          //setState
          try{
            setFirstTimeOpeningApp( (ASS_FirstTimeOpeningApp != null) ? 'false': 'true')
            setisSignedIn( (ASS_user_id != null) ? 'true': 'false')
            setusername( (ASS_user_name != null) ? ASS_user_name: 'false')
            setemail( (ASS_user_email != null) ? ASS_user_email: 'false')
            setpassword( (ASS_user_password != null) ? ASS_user_password: 'false')
            setcurrency( (ASS_currency != null) ? ASS_currency: 'false')
            setid( (ASS_user_id != null) ? ASS_user_id: 'false')
            setimage( (ASS_image != null) ? ASS_image: 'false')
            setContext([
              {FirstTimeOpeningApp,isSignedIn,username, email, id, password, currency, image, },
        {setFirstTimeOpeningApp,setisSignedIn,setusername, setemail, setid,setpassword, setcurrency, setimage}
            ])
            setisStartFetching(false)
          }catch(e){
            console.log('error from main-navigator: '+e)
          }
          
        }
  
        //call the checker
        getDataFromAsync()
      }, [isSignedIn, FirstTimeOpeningApp ,username, email, id, password])
    //stop

    const StackNav = createStackNavigator()

  return (
      <>
        <CONFIG.AppContext.Provider value={context}>
          <NavigationContainer>
              {
                  (isStartFetching) ? 
                  <>
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: CONFIG.Primary_color}}>
                      
                    </View>
                  </>
                  :
                  <>
                    <StackNav.Navigator headerMode={false}>
                  {
                    ( (false) ? 
                        <></>
                        :
                        <>
                        {(isSignedIn == 'false') ? 
                            <>
                            {/* guest */}
                              <StackNav.Screen name="Display" component={Display}/>
                              <StackNav.Screen name="Subscribe_Cat" component={Subscribe_Cat}/>
                            </>
                            :
                            <>
                            {/* user */}
                              <StackNav.Screen name="AppContainer" component={AppContainer}/>
                              <StackNav.Screen name="Houser" component={Houser}/>
                              
                            </>
                        }
                        
                        {/* universal screen */}
                        {/* <StackNav.Screen name="Subscribe_Cat" component={Subscribe_Cat}/> would make another duplicate file */}
                        </>
                        )
                    }
                    </StackNav.Navigator>
                  </>
              }
          </NavigationContainer>
      </CONFIG.AppContext.Provider>
      </>
  );
}
