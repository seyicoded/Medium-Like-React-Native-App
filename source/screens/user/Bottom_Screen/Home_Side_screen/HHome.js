import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList, ActivityIndicator} from 'react-native'
import * as CONFIG from '../../../../CONFIG'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Input, Button, Image} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Styles from '../../Styles'
import WebView from 'react-native-webview';

export default function HHome({navigation, route}) {
    // console.log(route)
    const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [all_categories, setall_categories] = useState(route.params.all_categories)
    const [all_articles, setall_articles] = useState(route.params.all_articles)
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

    // we would still pass it initial as props
    const getAll = async()=>{
        setLoading(true)
        try{
            var fd = {
                api_key: CONFIG.API_KEY,
                user_id: context[0].id
            }
            const res = await axios.post(`${CONFIG.BASE_URL}get-home-info`, fd);
            // console.log(res.data)
            setall_categories(res.data.categories)
            setall_articles(res.data.articles)
        }catch(e){
            console.log(e)
            error('an error occurred')
        }
        setLoading(false)
    }

    const getSingle = async(c_id)=>{
        setLoading(true)
        try{
            var fd = {
                api_key: CONFIG.API_KEY,
                user_id: context[0].id,
                c_id: c_id
            }
            const res = await axios.post(`${CONFIG.BASE_URL}get-home-info-single`, fd);
            // console.log(res.data)
            setall_articles(res.data.articles)
        }catch(e){
            console.log(e)
            error('an error occurred')
        }
        setLoading(false)
    }

    // console.log(all_articles)

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
        
        <View style={{flex: 1, marginTop: '10%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    <Icon name="menu" size={24} style={{borderWidth: 0.09, borderRadius: 12, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 6}} />
                </TouchableOpacity>
                <Text style={styles.title}>Home</Text>
            </View>

            <View style={{flex: 1,}}>
                <View style={{height: 72, marginTop: 15}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} style={{height: 40,}}>
                        <TouchableOpacity onPress={()=>{getAll(); setchoosen_cat_color(0)}}>
                            <Text style={[styles.cat_item, (choosen_cat_color == 0) ? {backgroundColor: 'green', color: 'white'}:{backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'black'}]}>All</Text>
                        </TouchableOpacity>

                        {
                            (all_categories).map((item, id)=>
                            <TouchableOpacity key={id} onPress={()=>{getSingle(item.c_id); setchoosen_cat_color(item.c_id)}}>
                                <Text style={[styles.cat_item, (choosen_cat_color == item.c_id) ? {backgroundColor: 'green', color: 'white'}:{backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'black'}]}>{item.category_name}</Text>
                            </TouchableOpacity>)
                        }
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    {
                        (all_articles.length == 0) ? 
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                            <Text>no articles yet</Text>
                        </View>: 
                        <FlatList
                            data={all_articles}
                            renderItem={({item, id}) => 
                                <TouchableOpacity style={{marginBottom: 20}}>
                                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: '5%'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.a_title}>{item.a_title}</Text>
                                            <Text style={styles.a_desc}>{(item.a_desc).substring(0, 120)}....</Text>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                            <Image style={{width: 100, height: 100, elevation: 2, borderRadius: 2}} source={{uri: `${CONFIG.BASE_URL}../../images/article_image/${item.a_image}`}} PlaceholderContent={<ActivityIndicator/>}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>}
                            keyExtractor={(item, index) => 'key'+index}
                            numColumns={1}
                        />
                    }
                    
                </View>
            </View>
        </View>
     </View>
  );
}

const styles = Styles.Home_Screen;