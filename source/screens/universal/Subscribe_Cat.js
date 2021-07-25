import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text,Image, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList} from 'react-native'
import * as CONFIG from '../../CONFIG'
import axios from 'axios';
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Input, Button} from 'react-native-elements'
import {CommonActions} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Subscribe_Cat({navigation, route}) {
    const u_id = route.params.u_id;
    const context = React.useContext(CONFIG.AppContext);
    const [Loading, setLoading] = useState(true)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [mylocation_lat, setmylocation_lat] = useState(8.97078316811123)
    const [mylocation_lng, setmylocation_lng] = useState(7.97078316811123)

    const [all_categories, setall_categories] = useState([])
    const [random, setrandom] = useState(null)

    const cat_selected = useRef({});

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

    const getLocation = async ()=>{
        let location = await Location.getCurrentPositionAsync({});
    
        const location_data = {lat: location.coords.latitude, lng: location.coords.longitude}
    
        //update my location
        setmylocation_lat(location_data.lat)
        setmylocation_lng(location_data.lng)
        // console.log(location_data)
    }

    const get_categories = async()=>{
        setLoading(true)
        var fd = {
            api_key: CONFIG.API_KEY
        };

        try{
            const res = await axios.post(`${CONFIG.BASE_URL}get_all_categories`, fd);
            // console.log(res.data.data)
            setall_categories(res.data.data)
            setLoading(false)
        }catch(e){
            console.log(e)
            error('an error occurred')
        }
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            error('Permission to access location was denied');
            return;
          }
    
          try{
            (await Location.requestBackgroundPermissionsAsync())
          }
          catch(e){}
          
          getLocation()

          get_categories()
        })();
    }, []);

    const set_adjust_ref = ()=>{
        var new_dt = {};
        Object.keys(cat_selected.current).map(function(_) {
            if( (cat_selected.current)[_] != null ){
                new_dt[_] = (cat_selected.current)[_];
            }
            // return j[_];
        })

        cat_selected.current = new_dt;
    }

    const process_reg_log = async ()=>{
        set_adjust_ref()
        const length= (Object.values(cat_selected.current)).length;
        if( length < 2){
            error('Select an Interest')
            return false
        }
        setLoading(true)
        // get country state of user
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mylocation_lat},${mylocation_lng}&result_type=administrative_area_level_1&key=${CONFIG.GOOGLE_API_KEY}`;
        const res = await axios.get(url);

        console.log("reach 1")
        const state = res.data.results[0].formatted_address;
        var category_list  = "";
        var i = 1;
        Object.keys(cat_selected.current).map(function(_) {
            if( length == i ){
                // end
                category_list = category_list+','+(cat_selected.current)[_];
            }else if(i == 1){
                // start
                category_list = category_list+(cat_selected.current)[_];
            }else{
                // normal
                category_list = category_list+','+(cat_selected.current)[_];
            }
            i++;
        })
        // console.log(category_list)
        // console.log((cat_selected.current))

        // send info to database
        var fd = {
            api_key: CONFIG.API_KEY,
            user_id: u_id,
            state: state,
            categories: category_list
        }

        const res_1 = await axios.post(`${CONFIG.BASE_URL}finalize_regis`, fd);
        const data_a= res_1.data;
        console.log("reach 2")

        if(!(data_a.status)){
            console.log(data_a.message)
            return false
        }

        // success
        await AsyncStorage.setItem('user_id',data_a.data.u_id+'')
        await AsyncStorage.setItem('user_email',data_a.data.email+'')
        await AsyncStorage.setItem('user_name',data_a.data.name+'')
        await AsyncStorage.setItem('image',data_a.data.photo_url+'')

        context[1].setisSignedIn(true)
        context[1].setid(data_a.data.u_id+'')
        setTimeout(()=>{
            navigation.navigate('AppContainer')
        },2000)
    }
  return (
    <View style={[styles.container, {width: '100%'}]}>
        {
            (Loading) ? <CONFIG.ALERT.Loader /> : <></>
        }
        {
            (showError) ? <CONFIG.ALERT.Alert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
        }
        {
            (showMessage) ? <CONFIG.ALERT.Alert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
        }

        <View style={{flex: 1, width: '100%', alignItems: 'center',}}>
            <View style={{paddingVertical: 16, backgroundColor: 'rgba(0,0,0,0.06)', width: '100%', shadowColor: 'rgba(0,0,0,0.06)', shadowOffset: {width: 0.9, height: 0.9}, shadowOpacity: 1, shadowRadius: 1, elevation: 9}}>
                <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>Welcome to {CONFIG.Company_Name}</Text>
            </View>

            <ScrollView style={{flex: 1}} horizontal={false} showsHorizontalScrollIndicator={false}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 24, fontWeight: '800', marginTop: 18}}>What are you interested in?</Text>
                    <Text style={{fontSize: 17, color: 'grey', fontWeight: '400', marginTop: 18}}>Choose One or more</Text>
                </View>

                <View style={{flexDirection: 'row', overflow: 'hidden'}}>
                    {/* {
                        all_categories.map((item,id)=>
                        <TouchableOpacity>
                            <Text style={{padding: 8, margin: 10, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', overflow: 'hidden', borderRadius: '12%'}}>{item.category_name}</Text>
                        </TouchableOpacity>
                        )
                    } */}
                    
                    <FlatList
                        data={all_categories}
                        renderItem={({item, id}) => 
                        <TouchableOpacity onPress={()=> {
                                if((cat_selected.current)[''+item.c_id] == null){
                                    (cat_selected.current)[''+item.c_id] = item.c_id;
                                    setrandom(Math.random() * 99999);
                                }else{
                                    (cat_selected.current)[''+item.c_id] = null;
                                    setrandom(Math.random() * 99999);
                                }

                            }}>
                            <Text style={[((cat_selected.current)[''+item.c_id] != null ? {backgroundColor: 'green', color: 'white'}:{}), {padding: 8, margin: 10, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', overflow: 'hidden', borderRadius: 12}]}>{item.category_name}</Text>
                        </TouchableOpacity>}
                        keyExtractor={(item, index) => 'key'+index}
                        numColumns={3}
                    />
                </View>
            </ScrollView>
            <View style={{alignItems: 'center', width: '100%', marginVertical: '3%'}}>
                <TouchableOpacity onPress={()=>{process_reg_log()}} style={{alignItems: 'center', width:'100%'}}>
                    <Text style={styles.btn}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = CONFIG.Styles_Display_Guest;