import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/SolariumContext';
import SolariumItem from './SolariumItem';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import * as Sentry from "@sentry/react-native";

const SolariumScreen = ({ navigation }) => {
    const { state, getMonthSolarium, useSolarium } = useContext(Context);

    useEffect(() => {
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        getMonthSolarium(month, year);

        const listener = navigation.addListener('didFocus', () => {
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            getMonthSolarium(month, year);
        });

        return () => {
            listener.remove();
        };
    }, []);

    Sentry.init({
        dsn: "https://5d8c787a799f4c60a9f61e133556cc31@o1228712.ingest.sentry.io/6378924",
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production.
        tracesSampleRate: 1.0,
        enableNative: false,
        enableInExpoDevelopment: true
      });

    return (
        <View>
            <SolariumItem solarium={state}/>
        </View>
    );
}

SolariumScreen.navigationOptions = {
    title: 'Solarium',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({})

export default Sentry.wrap(SolariumScreen);