import React from 'react';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Home_Screen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingTop: getStatusBarHeight(true),
        position: 'relative'
    },
    title: {
        fontWeight: '800',
        fontSize: 24
    },
    cat_item: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 10, marginLeft: 10, borderRadius: 12, overflow: 'hidden'
    },
    a_title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5
    },
    a_desc: {
        fontSize: 10,
        marginTop: 10,
        color: 'grey',
        width: '100%'
    },
})