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
    const [search_, setsearch_] = useState('')

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

    const get_search = async()=>{
      setLoading(true)
      console.log(search.current);
        try{
            var fd = {
                api_key: CONFIG.API_KEY,
                user_id: context[0].id,
                search: search.current
            }
            const res = await axios.post(`${CONFIG.BASE_URL}get-home-info-search`, fd);
            // console.log(res.data)
            setall_articles(res.data.articles)
        }catch(e){
            console.log(e)
            error('an error occurred')
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

        <View style={{flex: 1, paddingTop: 15, alignItems: 'center', width: '100%'}}>
          <TextInput keyboardType="web-search" value={search_} onChangeText={txt=> {setsearch_(txt); search.current = txt}} style={{borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 8, padding: 10, width: '94%'}} placeholder="What are you looking for" autoFocus={true} onEndEditing={()=>{
              if((search.current).length == 0){
                  error('enter a text to search');
                  return false;
              }
                get_search()
              }} />
          <Text />
          {
            (all_articles.length == 0) ?
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                <Text>what are you looking for</Text>
            </View>:
            <FlatList
            style={{flex: 1, width: '100%'}}
            data={all_articles}
            renderItem={({item, index}) => 
                <TouchableOpacity style={{marginBottom: 20}} onPress={()=>{navigation.navigate('News_Contents', {articles: all_articles, real_id: item.a_id, index: index})}}>
                    <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: '5%'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.a_title}>{item.a_title}</Text>
                            <Text style={styles.a_desc}>{(item.a_desc).substring(0, 120)}....</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{width: 70, height: 70, borderRadius: 100}} source={{uri: `${CONFIG.BASE_URL}../../images/article_image/${item.a_image}`}} PlaceholderContent={<ActivityIndicator/>}/>
                        </View>
                    </View>
                </TouchableOpacity>}
            keyExtractor={(item, index) => 'key'+index}
            numColumns={1}
        />
          }
        </View>
     </View>
  );
}

const styles = Styles.Home_Screen;