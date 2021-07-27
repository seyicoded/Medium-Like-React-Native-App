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

    // home screen extension to content
    content_title:{
        fontWeight: 'bold',
        fontSize: 24,
        paddingHorizontal: 10,
        textAlign: 'center',
        marginBottom: 10
    },
    content_close_btn: {
        fontSize: 24, position: 'absolute', top: getStatusBarHeight() + 10, right: 10,
        padding: 5
    },
    content_desc: {
        textAlign: 'justify',
        marginHorizontal: 14,
        fontSize: 10,
        color: 'grey',
        fontStyle: 'italic',
        marginBottom: 10
    },
    bottom_btn: {
        backgroundColor: 'black',
        color: 'white',
        paddingVertical: 20,
        width: '92%',
        margin: '1%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 8,
        overflow: 'hidden'
    }
})