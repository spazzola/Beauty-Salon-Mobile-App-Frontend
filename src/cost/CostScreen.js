import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from './context/CostContext';
import CostItem from './CostItem';
import { globalBackground } from '../../GlobalStyles';
import { useFonts } from 'expo-font';
import { buttonIcons } from '../icons/Icons';

const CostScreen = ({ navigation }) => {
    const { state, addCost, getCosts } = useContext(Context);
    const [date, setDate] = useState(new Date(Date.now()));

    const [loaded] = useFonts({
        KalamRegular: require('../../assets/fonts/Kalam-Regular.ttf'),
        KalamBold: require('../../assets/fonts/Kalam-Bold.ttf'),
    });

    useEffect(() => {
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        getCosts(month, year);

        const listener = navigation.addListener('didFocus', () => {
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            getCosts(month, year);
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (!loaded) {
        return null;
    }

    const onChange = (event, selectedDate) => {
        var month = selectedDate.getMonth() + 1;
        var year = selectedDate.getFullYear();
        let currentDate = selectedDate || date;
        setDate(currentDate);
        getCosts(month, year);
    };

    return (
        <View style={[globalBackground, styles.container]}>
            <DateTimePicker
                value={date}
                onChange={onChange}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={state}
                keyExtractor={cost => cost.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Cost', { id: item.id })}>
                            <CostItem cost={item}></CostItem>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('CostAdd')}>
                <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addClient')).uri} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    button: {
        width: 160,
        height: 80
    }
})

export default CostScreen;