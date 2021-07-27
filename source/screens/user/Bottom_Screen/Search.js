import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList, ActivityIndicator} from 'react-native'
import * as CONFIG from '../../../CONFIG'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Input, Button, Image} from 'react-native-elements'
import * as Styles from '../Styles'

export default function Search({navigation, route}) {
  const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [all_articles, setall_articles] = useState([])
    const [choosen_cat_color, setchoosen_cat_color] = useState(0)

    const search = useRef('');
    
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

        <View style={{flex: 1, paddingTop: 15, alignItems: 'center'}}>
          <TextInput value={search.current} onChangeText={txt=> search.current = txt} style={{borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 14, padding: 10, width: '94%'}} placeholder="What are you looking for" autoFocus={true} onEndEditing={()=>{}} />
        </View>
     </View>
  );
}

const styles = Styles.Home_Screen;