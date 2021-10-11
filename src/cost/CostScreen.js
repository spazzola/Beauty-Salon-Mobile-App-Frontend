import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from './context/CostContext';
import CostItem from './CostItem';

const CostScreen = ({ navigation }) => {
    const { state, addCost, getCosts } = useContext(Context);

    useEffect(() => {
        getCosts();

        const listener = navigation.addListener('didFocus', () => {
            getCosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <Text>Cost screen !!! {state.length}</Text>
            <Button title="Dodaj koszt" onPress={() => navigation.navigate('CostAdd')}/>
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