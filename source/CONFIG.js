import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, Platform, Dimensions, Text, Image, ActivityIndicator, View} from 'react-native'
import * as ALERTSYSTEM from './MainAlertSystem'
// import NumberFormat from 'react-number-format'
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const getstatusbarheight = getStatusBarHeight(true);
const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

export const ALERT = ALERTSYSTEM;

export const AppContext = React.createContext([]);

export const BASE_URL = "http://172.20.10.3:8000/api/v1/"
// export const BASE_URL = "http://blesify1.herokuapp.com/public/api/v1/"
export const API_KEY = "Blesify__API_KEY001";

export const GOOGLE_API_KEY = "AIzaSyCVS_wUbz4NMFovS0LVoGWrOBtbcpEKJ3U";
export const PUSHER_API_KEY = "bb511c06d0a6d05e2325"

// export const Primary_color = '#F98445';
export const Primary_color = 'black'; //blue--#1D05FB
export const Primary_color_2 = 'white'; //blue--#1D05FB
export const Primary_color_icon = 'black'; //blue--#1D05FB --#2D2294
export const Houser_Icon_color = 'rgba(183, 28, 28, 0.7)'; //blue=rgba(45,34,148,0.7)
export const HomeScreenTopFloat_Color = 'rgba(183, 28, 28, 0.5)'; //blue=rgba(45,34,148,0.5)
export const Secondary_color = '#C4C4C4'; //#727376
const android_font = 'sans-serif-medium';
const ios_font = 'ArialHebrew-Bold';

export const font = ((Platform.OS) == 'ios') ? ios_font: android_font;

export const Company_Logo = require('../assets/logo1.png');

export const Company_Logo_2 = require('../assets/logo2.png');

export const Company_Name = 'Blesify';

export const Company_Slang = 'Blesify';

const splash_text_color = Primary_color;
export const Styles_splash_screen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Primary_color_2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    company_logo: {
        height: 90,
        width: 90
    },
    company_slang: {
        color: splash_text_color,
        marginVertical: 25,
        ...Platform.select({
            android: {fontWeight: '600'},
            ios: {fontWeight: '900'}
        }),
        textTransform: 'uppercase',
        fontFamily: font,
    }
});

export const Styles_Display_Guest = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: getStatusBarHeight(true)
    },

    logo: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginVertical: '6%'
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: '3%',
        textAlign: 'center'
    },
    already_text: {
        fontSize: 14
    },
    terms_bottom: {
        position: 'absolute',
        bottom: 0
    },
    terms_bottom_txt: {
        textAlign: 'center',
        padding: 15,
        lineHeight: 20
    }, 
    btn: {
        backgroundColor: 'green',
        width: '94%',
        textAlign: 'center',
        color: 'white',
        paddingVertical: 16,
        elevation: 6,
        borderRadius: 24,
        overflow: 'hidden',
        fontSize: 16

    }
});



export const register_t_c = "By clicking the sign up button, you agree to the terms and conditions of using our product & services";

//validate email
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function ReactNativeNumberFormat({ value, prefix }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={`${prefix} `}
        renderText={formattedValue => <Text>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }


export function ImageLoader(props){
    const [isLoading, setisLoading] = useState(false)
    const [hasLoaded, sethasLoaded] = useState(false)

    return (
        <View style={props.userAcct}>

            {
                (props.hideLoader != null) ?
                <></>
                :
                <ActivityIndicator color={Primary_color} size={30} style={{position: 'absolute', zIndex: -11, display: (hasLoaded) ? 'none':'flex', marginHorizontal: 14, right: '48%', top: '45%'}}/>
            }

            <Image onLoadEnd={()=>sethasLoaded(true)} onLoad={()=>sethasLoaded(true)} {...props} />

        </View>
    )

    // useEffect(()=>{
    //     sethasLoaded(false)
    // },[])

    // console.log('re 0');
    // if(isLoading){
    //     return (
    //         <View {...props}>
    //             <ActivityIndicator color={Primary_color} size={30}/>
    //         </View>
    //     )
    // }else{
    //     if(hasLoaded){
    //         return (
    //             <Image onLoadStart={()=>{console.log('re 2')}} onLoadEnd={()=>{
    //                 console.log('re 1');
    //                 setisLoading(false); sethasLoaded(true)
    //             }} {...props} />
    //         )
    //     }else{
    //         return (
    //             <Image onLoadStart={()=>{console.log('re 2')}} onLoadEnd={()=>{
                    
    //             }} {...props} />
    //         )
    //     }
        
    // }

}