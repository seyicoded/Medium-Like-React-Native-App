import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList} from 'react-native'
import * as CONFIG from '../../CONFIG'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Input, Button, Image} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Styles from '../user/Styles'

export default function HHome({navigation, route}) {
    const context = React.useContext(CONFIG.AppContext);
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
     </View>
  );
}

const styles = Styles.Home_Screen;