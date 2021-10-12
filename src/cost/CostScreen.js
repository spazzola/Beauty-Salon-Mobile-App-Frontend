import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context } from './context/CostContext';
import CostItem from './CostItem';

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
        <View>
            <DateTimePicker
                value={date}
                onChange={onChange}
            />
            <Text>Cost screen !!! {state.length}</Text>
            <Button title="Dodaj koszt" onPress={() => navigation.navigate('CostAdd')} />
            <FlatList
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
        </View>
    );
}

const styles = StyleSheet.create({})

export default CostScreen;