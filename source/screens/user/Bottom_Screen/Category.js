import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList, ActivityIndicator, Alert} from 'react-native'
import * as CONFIG from '../../../CONFIG'
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import {Input, Button, Image} from 'react-native-elements'
import * as Styles from '../Styles'

export default function Category({navigation, onLoadArticle, all_categories, all_univ_cat, category_ref_c}) {
    const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [all_articles, setall_articles] = useState([])
    const [choosen_cat_color, setchoosen_cat_color] = useState(0)

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

    const sub_checker = (c_id)=>{
        // return true or false
        var hasValue = 0;
        all_categories.map((item, id)=>{
            if(item.c_id == c_id){
                hasValue = 1;
            }
        })
        
        return ((hasValue == 1) ? true: false);
    }

    const toggler = async (c_id)=>{
        setLoading(true)
        try{
            var fd = {
                api_key: CONFIG.API_KEY,
                hascat_already: sub_checker(c_id) ? 1:2,
                user_id: context[0].id,
                c_id: c_id
            }

            console.log(fd)
            const res = await axios.post(`${CONFIG.BASE_URL}sub_toggler`, fd);
            console.log(res.data)

            if(res.data.status){
                // load to main
                success(res.data.message)

                setTimeout(()=>{
                    navigation.navigate("AppContainer")
                    // navigation.dispatch(
                    //     CommonActions.navigate({
                    //       name: 'AppContainer',
                    //       params: {},
                    //     })
                    // );

                }, 2300)
            }else{
                error(res.data.message)
            }
        }catch(e){
            error('an error occurred')
            console.log(e)
        }
        setLoading(false)
    }
  return (
    <View style={[styles.container, {width: '100%', paddingTop: 5}]}>
        {
            (Loading) ? <CONFIG.ALERT.Loader /> : <></>
        }
        {
            (showError) ? <CONFIG.ALERT.Alert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
        }
        {
            (showMessage) ? <CONFIG.ALERT.Alert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
        }

        <ScrollView style={{flex: 1, width: '100%'}}>
            <View style={{flex: 1, paddingTop: 3, width: '100%',}}>
                {
                    (all_univ_cat).map((item, id)=>
                    <TouchableOpacity key={id} onPress={()=>{
                            onLoadArticle(item.c_id);
                            setchoosen_cat_color(item.c_id);
                            category_ref_c.close();
                        }}>
                        <View style={[{flexDirection: 'row', padding: '1%', borderBottomColor: 'rgba(0, 0, 0, 0.1)', borderBottomWidth: 0.8}, (choosen_cat_color == item.c_id) ? {backgroundColor: 'rgba(0, 0, 0, 0.1)',}:{}]}>
                            <Image source={{uri: `${CONFIG.BASE_URL}../../images/category_image/${item.categories_image}`}} style={{width: 70, height: 70, borderRadius: 14}} PlaceholderContent={<ActivityIndicator />}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 9, flex: 1}}>
                                <View>
                                    <Text style={{paddingTop: 20, fontSize: 16, fontWeight: '500'}}>{item.category_name}</Text>
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row'}}>
                                    <Icon1 onPress={()=>{
                                        Alert.alert("CONFIRMATION REQUEST", `are you sure you want to ${sub_checker(item.c_id) ? 'unsubscribe':'subscribe'} for ${item.category_name}, app re-load would be automatic tho`, [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "Proceed", onPress: () => toggler(item.c_id) }
                                        ])
                                    }} name={sub_checker(item.c_id) ? "star" : "star-outline"} size={24} style={{marginRight: 10, color: 'gold', padding: 10}}/>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>)
                }
            </View>
        </ScrollView>
     </View>
  );
}

const styles = Styles.Home_Screen;