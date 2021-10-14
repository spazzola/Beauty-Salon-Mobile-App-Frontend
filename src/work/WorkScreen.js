import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from './context/WorkContext';
import WorkItem from './WorkItem';

const WorkScreen = ({ navigation }) => {
    const { state, addClient, getWorks } = useContext(Context);

    useEffect(() => {
        getWorks();

        const listener = navigation.addListener('didFocus', () => {
            getWorks();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <Text>Work screen !!! {state.length}</Text>
            <Button title="Dodaj usługę" onPress={() => navigation.navigate('WorkAdd')}/>
            <FlatList 
                data={state}
                keyExtractor={work => work.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Work', { id: item.id })}>
                            <WorkItem work={item}></WorkItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default WorkScreen;