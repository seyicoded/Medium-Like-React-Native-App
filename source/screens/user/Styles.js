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
    }
})