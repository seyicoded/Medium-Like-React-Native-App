import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet,SafeAreaView,TouchableOpacity, Dimensions, FlatList} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import HHome from './Home_Side_screen/HHome'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SideNav = createDrawerNavigator();

export default function Home({navigation, route}) {
  // console.log(route)
  return (
    <SideNav.Navigator>
        <SideNav.Screen name="SNAV_HOME" options={{
            title: 'HOME',
            drawerIcon: ({color, size, focused})=><Icon name="home" size={size} color={focused ? color: 'grey'} />
            }} component={HHome} initialParams={{all_articles: route.params.all_articles, all_categories: route.params.all_categories, all_univ_cat: route.params.all_univ_cat, all_banners: route.params.all_banners}}/>
    </SideNav.Navigator>
  );
}
