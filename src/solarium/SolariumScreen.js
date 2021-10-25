import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/SolariumContext';
import SolariumItem from './SolariumItem';

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

    return (
        <View>
            <SolariumItem solarium={state}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SolariumScreen;