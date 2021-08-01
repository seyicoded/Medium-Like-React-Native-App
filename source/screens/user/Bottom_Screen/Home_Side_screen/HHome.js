import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList, ActivityIndicator, Linking} from 'react-native'
import * as CONFIG from '../../../../CONFIG'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import {Input, Button, Image} from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet"
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from "moment"
import * as Styles from '../../Styles'
import Search from '../Search'
import Category from '../Category';

export default function HHome({navigation, route}) {
    // console.log(route)
    const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [all_categories, setall_categories] = useState(route.params.all_categories)
    const [all_articles, setall_articles] = useState(route.params.all_articles)
    const [all_univ_cat, setall_univ_cat] = useState(route.params.all_univ_cat)
    const [all_banners, setall_banners] = useState(route.params.all_banners)
    const [choosen_cat_color, setchoosen_cat_color] = useState(0)
    const [bookmark, setbookmark] = useState(null)

    const banner_counter = useRef(0);

    // console.log(all_banners)

    // console.log(all_univ_cat)

    const search_ref = useRef(null);
    const category_ref = useRef(null);
    
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

    // get store value
    const get_store_value = async ()=>{
        const val = await AsyncStorage.getItem('bookmark_collections');
        if(val != null){
            setbookmark(JSON.parse(val))
        }
        console.log(val)
    }
    useEffect(()=>{
        get_store_value()
    }, [])

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

        {/* sheet for search start */}
            <RBSheet
            ref={ref => {
                search_ref.current = ref;
            }}
            closeOnDragDown={true}
            closeOnPressMask={true}
            openDuration={250}
            customStyles={{
                container: {
                width: '100%',
                alignItems: 'center',
                height: '94%',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12
                }
            }}
            >
                <Search navigation={navigation} />
            </RBSheet>
        {/* sheet for search end */}

        {/* sheet for category start */}
        <RBSheet
            ref={ref => {
                category_ref.current = ref;
            }}
            closeOnDragDown={true}
            closeOnPressMask={true}
            openDuration={250}
            customStyles={{
                container: {
                width: '100%',
                alignItems: 'center',
                height: '94%',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12
                }
            }}
            >
                <Category navigation={navigation} onLoadArticle={c_id=>getSingle(c_id)} all_categories={all_categories} all_univ_cat={all_univ_cat} category_ref_c={category_ref.current}/>
            </RBSheet>
        {/* sheet for category end */}
        
        <View style={{flex: 1, marginTop: '6%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%'}}>
                <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                    {/* <Icon name="menu" size={24} style={{borderWidth: 0.09, borderRadius: 12, borderColor: 'rgba(0, 0, 0, 0.3)', padding: 6}} /> */}
                    <Image
                        source={{ uri: context[0].image }}
                        style={{ width: 30, height: 30, borderRadius: 100 }} onError={err=>console.log(err.target.toString())}
                        PlaceholderContent={<ActivityIndicator />} />
                </TouchableOpacity>
                <Text style={styles.title}>{CONFIG.Company_Name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Icon1 onPress={()=>search_ref.current.open()} name="search" size={24} style={{marginRight: 15, }}/>
                    <Icon1 onPress={()=>category_ref.current.open()} name="featured-play-list" size={24}/>
                </View>
            </View>

            <View style={{flex: 1,}}>
                <View style={{height: 32, marginTop: 15}}></View>
                {/* <View style={{height: 72, marginTop: 15}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={false} style={{height: 40,}}>
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
                </View> */}
                <View style={{flex: 1}}>
                    {
                        (all_articles.length == 0) ? 
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                            <Text>no articles yet</Text>
                        </View>: 
                        <FlatList
                            data={all_articles}
                            refreshing={false}
                            onRefresh={()=>getAll()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => 
                                <>
                                <TouchableOpacity style={{marginBottom: 20}} onPress={()=>{navigation.navigate('News_Contents', {articles: all_articles, real_id: item.a_id, index: index})}}>
                                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: '5%'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.a_title}>{item.a_title}</Text>
                                            <Text style={styles.a_desc}>{(item.a_desc).substring(0, 120)}....</Text>
                                            <Text />
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{color: 'rgba(0, 0, 0, 0.6)'}}>
                                                    {moment().diff(moment(item.a_date), 'days')} days ago 
                                                </Text>
                                                
                                                <IconEntypo name="dot-single" size={20} color="rgba(0, 0, 0, 0.6)" />
                                                
                                                <Text style={{color: 'rgba(0, 0, 0, 0.6)'}}>{Math.ceil((50 * (item.a_content).length) / 100)} min read</Text>
                                                
                                                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                                    <Icon1 name={ ( (bookmark!=null) && (bookmark[item.a_id] != undefined) && (bookmark[item.a_id] != null) ) ? 'bookmark' : 'bookmark-outline' } onPress={()=>{
                                                        // setLoading(true)
                                                        if(bookmark != null){
                                                            var s = bookmark;

                                                            try{
                                                                if(s[item.a_id] == null || s[item.a_id] == null){
                                                                    s[item.a_id] = item.a_id;
                                                                }else{
                                                                    s[item.a_id] = null;
                                                                }
                                                            }catch(e){
                                                                s[item.a_id] = null;
                                                            }
                                                            (async()=>{
                                                                await AsyncStorage.setItem('bookmark_collections', JSON.stringify(s));
                                                                get_store_value();
                                                            })()
                                                        }else{
                                                            var s = {}

                                                            try{
                                                                if(s[item.a_id] == null || s[item.a_id] == null){
                                                                    s[item.a_id] = item.a_id;
                                                                }else{
                                                                    s[item.a_id] = null;
                                                                }
                                                            }catch(e){
                                                                s[item.a_id] = null;
                                                            }
                                                            (async()=>{
                                                                await AsyncStorage.setItem('bookmark_collections', JSON.stringify(s));
                                                                get_store_value();
                                                            })()

                                                            // setLoading(false)
                                                        }
                                                    }} size={18} style={{marginRight: 10}} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                            <Image style={{width: 70, height: 70, borderRadius: 100}} source={{uri: `${CONFIG.BASE_URL}../../images/article_image/${item.a_image}`}} PlaceholderContent={<ActivityIndicator/>}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <Text style={{width: 0, height: 0, zIndex: -99}}>{banner_counter.current = Math.ceil( Math.random() * all_banners.length ) - 1}</Text>

                                {
                                    (((index % 4) == 0) && 
                                    <TouchableOpacity onPress={()=>Linking.openURL(`${all_banners[banner_counter.current].http_link}`)} style={{width: '100%', position: 'relative'}}>
                                        <View style={{position:'absolute', zIndex: 11, top: '1%', right: '1%', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{backgroundColor: 'white', marginRight: '2%', padding: '1%', textAlign: 'center', borderRadius: 8, overflow: 'hidden', color: 'rgba(0, 0, 0, 0.4)', elevation: 9}}>ad</Text>
                                        </View>
                                        <Image source={{uri: `${CONFIG.BASE_URL}../../images/banners_image/${all_banners[banner_counter.current].b_image}`}} style={{width: '100%', height: 300, resizeMode: 'stretch'}} PlaceholderContent={<ActivityIndicator />} />
                                    </TouchableOpacity>)
                                }
                                </>}
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