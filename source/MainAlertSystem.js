import React from 'react'
import { View, Image, Text,StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Iconi from 'react-native-vector-icons/Ionicons';
import Icona from 'react-native-vector-icons/AntDesign';
import * as CONFIG from './CONFIG'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Loader({message}) {

    return (
        <View style={{...styles.modal_cover,width: windowWidth,height: windowHeight,zIndex: 10000,}}>
            <View>
                <ActivityIndicator size='large' color={CONFIG.Primary_color_icon}/>
                {
                    ((message != undefined) && <Text style={{color: 'white', fontFamily: 'Lato', fontSize: 20}}>{message}</Text>)
                }
                {/* <Image source={require('../assets/resource/loader1.gif')}/> */}
            </View>
        </View>
    )
}

export function SUBLoader() {

    return (
        <View style={{...styles.modal_cover,width: '100%',height: '100%',zIndex: 10000,}}>
            <View>
                <ActivityIndicator size='large' color={CONFIG.Primary_color_icon}/>
                {/* <Image source={require('../assets/resource/loader1.gif')}/> */}
            </View>
        </View>
    )
}

export function Alert(props){
    //type: error::success::message
    //console.log(props)

    return (
        <View style={{...styles.modal_cover,width: windowWidth,height: windowHeight,zIndex: 1000,}}>
            <View style={{...styles.card}}>
                {
                    (props.type == 'error') ? (
                        // <Icon name="circle-with-cross" size={ ((Platform.OS == 'android') ? 50:50) } color="rgba(102, 102, 102, 0.6)" />
                        <Text style={{fontWeight: 'bold', borderBottomColor: 'rgba(0,0,0,1)', borderBottomWidth: 0, fontSize: 16, color: '#808080', width: '100%', textAlign: 'center'}}>Error</Text>
                    ) : (
                        
                        (props.type == 'success') ? (
                            // <Iconi name={( (Platform.OS) == 'android' ) ? "md-checkmark-circle": "ios-checkmark-circle"} size={108} color="rgba(102, 202, 102, 0.6)" />
                            <Text style={{fontWeight: 'bold', borderBottomColor: 'rgba(0,0,0,1)', borderBottomWidth: 0, fontSize: 16, color: '#808080', width: '100%', textAlign: 'center'}}>Success</Text>
                        ) : (
                            <Icona name="message1" size={91} color="black" />
                        )
                        
                    )
                }
                <Text></Text>

                <Text style={{fontFamily: 'Lato', fontSize: 14, textTransform: 'capitalize', paddingHorizontal: 8, textAlign: 'center'}}>{props.message}</Text>
                {/* {
                    (props.type !== 'success') ? (
                        <TouchableOpacity style={{width: '100%', marginTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 1}} onPress={()=>{
                            const dism = props.hideModal
                            dism(false)
                        }}>
                            <Text style={{...styles.card_dismiss, color: CONFIG.Primary_color_icon}}>DISMISS</Text>
                        </TouchableOpacity>
                    ) : (<Text></Text>)
                } */}
                
                    <TouchableOpacity style={{width: '100%', marginTop: 20, borderTopColor: 'rgba(0, 0, 0, 0.1)', borderTopWidth: 1}} onPress={()=>{
                        const dism = props.hideModal
                        dism(false)
                    }}>
                        <Text style={{...styles.card_dismiss, color: CONFIG.Primary_color_icon}}>DISMISS</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal_cover: {
        position: 'absolute',
        flex: 1,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    card: {
        backgroundColor: '#F1F1F1',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 14,
        width: '70%',
        alignItems: 'center',
        shadowColor: 'rgba(10,30,210,0.2)',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 110,
        fontSize: 10,
        paddingBottom: 0,
        paddingHorizontal: 0
    },
    card_message: {
        fontSize: 18,
        ...Platform.select({
            android: {
                fontSize: 14
            }
        }),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    card_dismiss: {
        width: '100%',
        textAlign: 'center',
        paddingVertical: 15,
        marginTop: 5,
        color: CONFIG.Primary_color_icon,
        fontWeight: 'bold',
        fontSize: 16,
        overflow: 'hidden',
        borderRadius: 14,
    }
    
})