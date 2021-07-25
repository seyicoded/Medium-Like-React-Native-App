import React, {useState, useEffect, useRef} from 'react';
import { View, Text,Image, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native'
import * as CONFIG from '../../CONFIG'
// import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';

export default function Display({navigation, route}) {
    const [signupmode, setsignupmode] = useState(true);

    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')

    const error = (msg)=>{
        setLoading(false)
        setAlertMessage(msg)
        setshowError(true)
    }

    const success = (msg)=>{
        setLoading(false)
        setAlertMessage(msg)
        setshowMessage(true)
    }

    const load_gmail_signup = async()=>{
        setLoading(true)
        const { type, accessToken, user } = await Google.logInAsync({
            // iosClientId: `260418163369-l73hcp5dpfr61tef41sajte482cplhhg.apps.googleusercontent.com`,
            // androidClientId: `260418163369-n9obl9o180eijqnhc2i68fbkvf348ca0.apps.googleusercontent.com`,

            iosClientId: `260418163369-d0m7vlr9gbcesn962nmkd502s42pca8l.apps.googleusercontent.com`,
            androidClientId: `260418163369-c0aq9maf61lfkuhuioms3bl4i8h6cj85.apps.googleusercontent.com`,

            iosStandaloneAppClientId: `260418163369-v83d8euumnueslsbk92suejduj5guma0.apps.googleusercontent.com`,
            androidStandaloneAppClientId: `260418163369-jq531797ieedqo69g5fto37j24ni0tm5.apps.googleusercontent.com`,
        });
          
        if (type === 'success') {
            /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
            console.log(user);
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log('aaa')
            console.log(userInfoResponse)
        }else{
            console.log('a');
        }
        // try {
        //     await GoogleSignIn.initAsync({
        //         // You may ommit the clientId when the firebase `googleServicesFile` is configured
        //         clientId: 'com.googleusercontent.apps.353146767564-70b7pel2rf04o647r3pnmnkrb730bg1i',
        //         // Provide other custom options...
        //       });
        // } catch ({ message }) {
        //     error(message)
        //     console.log('GoogleSignIn.initAsync(): ' + message);
        // }

        // try {
        //     await GoogleSignIn.askForPlayServicesAsync();
        //     const { type, user } = await GoogleSignIn.signInAsync();
        //     if (type === 'success') {
        //       console.log(user)
        //     }
        // } catch ({ message }) {
        //     error(message)
        //     alert('login: Error:' + message);
        // }
        setLoading(false)
    }
  return (
    <View style={styles.container}>
        {
            (Loading) ? <CONFIG.ALERT.Loader /> : <></>
        }
        {
            (showError) ? <CONFIG.ALERT.Alert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
        }
        {
            (showMessage) ? <CONFIG.ALERT.Alert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
        }
      <View>
          <Image source={require('../../../assets/logo1.png')} style={styles.logo}/>
      </View>
      {
          (signupmode) ? 
          <View style={{width: '100%', alignItems: 'center'}}>
              <View>
                    <Text style={styles.title}>Join {CONFIG.Company_Name}</Text>
                </View>

                <View style={{width: '100%'}}>
                    <Button_C onPress={()=>{load_gmail_signup()}} source={require('../../../assets/google.png')}  name="Sign up with Google"/>
                    <Button_C onPress={()=>{}} source={require('../../../assets/email.png')} name="Sign up with Email"/>
                </View>

                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={()=>setsignupmode(false)} >
                            <Text style={{color: 'green', }}> Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </View>
          :
          <View style={{width: '100%', alignItems: 'center'}}>
              <View>
                    <Text style={styles.title}>Welcome Back !</Text>
                </View>

                <View style={{width: '100%'}}>
                    <Button_C onPress={()=>{load_gmail_signup()}} source={require('../../../assets/google.png')}  name="Sign in with Google"/>
                    <Button_C onPress={()=>{}} source={require('../../../assets/email.png')} name="Sign in with Email"/>
                </View>

                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=>setsignupmode(true)}>
                            <Text style={{color: 'green', }}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </View>
      }

      {
          (signupmode && 
          <View style={styles.terms_bottom}>
            <Text style={styles.terms_bottom_txt}>By signing up, you agree to our <Text style={{color: 'green'}}>Terms of Service</Text> and acknowledge that our <Text style={{color: 'green'}}>Privacy Policy</Text> applies to you.</Text>
        </View>)
      }

     </View>
  );
}

const styles = CONFIG.Styles_Display_Guest;

function Button_C({name,source,onPress}) {

    return (
        <TouchableOpacity style={{width: '100%', }} onPress={()=>onPress()}>
            <View style={styles_c.btnSecondary} >
                <Image source={source} style={styles_c.btn}/> 
                <Text style={{fontSize: 20, flex: 1, paddingLeft: 30, fontWeight: '400'}}>{name}</Text>
            </View>
      </TouchableOpacity> 
    )
}
const styles_c = StyleSheet.create({
    btn: {
    
        flexDirection: 'row',
        height: 24,
        width:24,
        borderColor: '#a5a5a5',
        justifyContent: 'center',
        alignItems: 'center',
       
      },
      btnSecondary: {
        flexDirection: 'row',
        justifyContent:'space-between' , 
        height: 50,
        margin:15,
        borderWidth: 2,
        borderColor: '#a5a5a5',
        padding:25,
        alignItems: 'center',
        borderRadius: 40,
        paddingVertical: 0,
        width: '90%',
        marginLeft: '5%'
      }
})

