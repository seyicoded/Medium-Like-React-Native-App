import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList, ActivityIndicator, Linking} from 'react-native'
import * as CONFIG from '../../CONFIG'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Input, Button, Image} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Styles from '../user/Styles'
import WebView from 'react-native-webview';
import Carousel from 'react-native-snap-carousel';

export default function News_Contents({navigation, route}) {
    // console.log(route)
    const all_articles = route.params.articles;
    const real_id = route.params.real_id;
    var index = route.params.index;
    const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [num, setnum] = useState()
    const [num_aa, setnum_aa] = useState(0)

    const deviceWidth = Dimensions.get('screen').width
    const deviceHeight = Dimensions.get('screen').height

    const c_ref = useRef(null);

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

    useEffect(()=>{
        setnum((parseInt(deviceWidth) * (parseInt(index) + 1 )));

        if((c_ref.current) != null){
            // console.log("reach"+index);
            c_ref.current.snapToItem(index);
            setnum_aa((Math.random) * 999999)
            // c_ref.current.ScrollTo({
            //     x: num,
            //     animated: true,
            // })

        }

        // console.log("reach bt");
    }, [index])

    useEffect(()=>{
        if(num_aa != 0){
            c_ref.current.snapToItem(index);

            setTimeout(()=>{
                c_ref.current.snapToItem(index);
            }, 250)
        }
    }, [num_aa])

    const sliderWidth = deviceWidth;
    const itemWidth = deviceWidth;

    // console.log(parseInt(index))
  return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
          <Carousel
            ref={c => { c_ref.current = c; }}
            data={all_articles}
            renderItem={({item, index}) => {
                return (
                        <ScrollView style={{flex: 1}}>
                            <View style={{flex: 1, alignItems: 'center', paddingTop: 60}}>
                                <Text style={styles.content_title}>{ item.a_title }</Text>
                                <Image style={{width: ((deviceWidth * 90) / 100), height: 360, borderRadius: 4, marginBottom: 10}} source={{uri: `${CONFIG.BASE_URL}../../images/article_image/${item.a_image}`}} PlaceholderContent={<ActivityIndicator/>}/>
                                <Text style={styles.content_desc}>{item.a_desc}</Text>

                                <WebView containerStyle={{width: '100%', backgroundColor: 'red', height: 500, overflow: 'scroll'}} javaScriptEnabled={true}
                                injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                                scalesPageToFit={true}
                                source={{html: `${item.a_content}`}} />

                                {/* generate button */}
                                <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                                    <TouchableOpacity style={{flex: 1, width: '100%', alignItems: 'center'}} onPress={()=>{
                                        try{
                                            Linking.openURL(item.bottom_button_link)
                                        }catch(e){
                                            console.log(e)
                                            error('an error occurred')
                                        }
                                    }}>
                                        <Text style={styles.bottom_btn}>{item.bottom_button_text}</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </ScrollView>
                    );
                }
            }
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            onSnapToItem={(index_new)=> {index = index_new; }}
        />

        <Icon name="close" style={styles.content_close_btn} onPress={()=>navigation.goBack()}/>
      </View>
  );
}

const styles = Styles.Home_Screen;