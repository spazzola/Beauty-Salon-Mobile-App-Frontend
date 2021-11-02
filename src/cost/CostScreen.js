import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from './context/CostContext';
import CostItem from './CostItem';
import { globalBackground, button, buttonText } from '../../GlobalStyles';

const CostScreen = ({ navigation }) => {
    const { state, addCost, getCosts } = useContext(Context);
    const [date, setDate] = useState(new Date(Date.now()));

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
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Cost', { id: item.id })}>
                            <CostItem cost={item} index={index}></CostItem>
                        </TouchableOpacity>
                    );
                }}
            />

            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('CostAdd')}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj koszt</Text>
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
    },
    wrapper: {
        position: 'absolute',
        top: '87%',
        left: '50%',
        zIndex: 1,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    }
})

export default CostScreen;