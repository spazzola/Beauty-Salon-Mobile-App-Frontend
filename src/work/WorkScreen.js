import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Context } from './context/WorkContext';
import WorkItem from './WorkItem';
import { globalBackground, button, buttonText } from '../../GlobalStyles';

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
        <View style={[globalBackground, styles.container]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={state.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0
                    //return a.name.localeCompare(b.name); //using String.prototype.localCompare()
                })}
                keyExtractor={work => work.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Work', { id: item.id })}>
                            <WorkItem work={item} index={index}></WorkItem>
                        </TouchableOpacity>
                    );
                }}
            />

            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('WorkAdd')}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj usługę</Text>
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

export default WorkScreen;