import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as CONFIG from '../../CONFIG'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { Image } from 'react-native-elements';
import Home from './Bottom_Screen/Home'
import Search from './Bottom_Screen/Search'
import Settings from './Bottom_Screen/Settings'

const BottomNav = createBottomTabNavigator();

export default function componentName({navigation, route, all_articles, all_categories, all_univ_cat, all_banners}) {
    const context = React.useContext(CONFIG.AppContext);
    // console.log({all_articles: all_articles, all_categories: all_categories})
    // console.log(all_univ_cat)

    return (
        <Home navigation={navigation} route={ {params: {all_articles: all_articles, all_categories: all_categories, all_univ_cat: all_univ_cat, all_banners: all_banners}} } all_articles={all_articles} all_categories={all_categories}/>
    );

    // well he asked for it so we did it... fuck it
  return (
    <BottomNav.Navigator tabBarOptions={{labelStyle: {height: 0}}}>
        <BottomNav.Screen name="BNA_HOME" options={{
            title: '',
            tabBarIcon: ({color, size, focused})=><Icon name="home" size={size} color={focused ? 'green':'grey'}/>,
            }} component={Home} initialParams={{all_articles: all_articles, all_categories: all_categories}}/>

        <BottomNav.Screen name="BNA_Search" options={{
            title: '',
            tabBarIcon: ({color, size, focused})=><Icon1 name="search" size={size} color={focused ? 'green':'grey'}/>,
            }} component={Search}/>
            
        <BottomNav.Screen name="BNA_Settings" options={{
            title: '',
            tabBarIcon: ({color, size, focused})=>((context[0].image != 'false') && (context[0].image != '') ) ? 
                <Image
                source={{ uri: context[0].image }}
                style={{ width: size, height: size, borderRadius: 100 }} onError={err=>console.log(err.target.toString())}
                PlaceholderContent={<ActivityIndicator />} />
                :
                <Icon1 name="search" size={size} color={focused ? 'green':'grey'}/>,
            }} component={Settings}/>

    </BottomNav.Navigator>
  );
}
