import React, {useState, useEffect, useRef} from 'react';
import { View, Text,Image, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native'
import * as CONFIG from '../../CONFIG'

export default function Display({navigation, route}) {
    const [signupmode, setsignupmode] = useState(true);
  return (
    <View style={styles.container}>
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
                    <Button_C source={require('../../../assets/google.png')}  name="Sign up with Google"/>
                    <Button_C source={require('../../../assets/email.png')} name="Sign up with Email"/>
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
                    <Button_C source={require('../../../assets/google.png')}  name="Sign in with Google"/>
                    <Button_C source={require('../../../assets/email.png')} name="Sign in with Email"/>
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

function Button_C({name,source,navigation}) {

    return (
        <TouchableOpacity style={{width: '100%', }}>
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

