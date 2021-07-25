import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { View, Text, Animated, Easing, Image } from 'react-native';
import * as CONFIG from './CONFIG'

export default function SlashLoader() {
    const animatedValue = new Animated.Value(0)
    const animatedValueSlang = new Animated.Value(0)
    // const [opacity, setOpacity] = useState((animatedValue))
    
    const animatedStyle ={
        opacity : animatedValue
    }

    const animatedStyleSlang ={
        opacity : animatedValueSlang
    }

    const animate = ()=>{
        Animated.timing(animatedValue, {
            toValue : 0,
            timing : 400,
            useNativeDriver: true
            }).start(()=>{
            Animated.timing(animatedValue,{
                toValue : 1,
                duration : 3700,
                useNativeDriver: true
            }).start();
        })
    }

    const animateSlang = ()=>{
        Animated.timing(animatedValueSlang, {
            toValue : 0,
            timing : 1700,
            useNativeDriver: true
            }).start(()=>{
            Animated.timing(animatedValueSlang,{
                toValue : 1,
                duration : 1600,
                useNativeDriver: true
            }).start();
        })
    }

    useEffect(()=>{
        animate();
        animateSlang();
    }, []);

    // const opacity = animatedValue.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, 1, 0]
    // })

  return (
    <View style={CONFIG.Styles_splash_screen.container}>
      <StatusBar />
      <Animated.Image style={[CONFIG.Styles_splash_screen.company_logo, animatedStyle]} source={CONFIG.Company_Logo}/>
      <Animated.Text style={[CONFIG.Styles_splash_screen.company_slang, animatedStyleSlang]}>
          {CONFIG.Company_Slang}
      </Animated.Text>
     </View>
  );
}
