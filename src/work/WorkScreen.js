import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Context } from './context/WorkContext';
import WorkItem from './WorkItem';
import { globalBackground } from '../../GlobalStyles';
import { useFonts } from 'expo-font';
import { buttonIcons } from '../icons/Icons';

const WorkScreen = ({ navigation }) => {
    const { state, addClient, getWorks } = useContext(Context);
    const [loaded] = useFonts({
        KalamRegular: require('../../assets/fonts/Kalam-Regular.ttf'),
        KalamBold: require('../../assets/fonts/Kalam-Bold.ttf'),
    });

    useEffect(() => {
        getWorks();

        const listener = navigation.addListener('didFocus', () => {
            getWorks();
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (!loaded) {
        return null;
    }

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
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Work', { id: item.id })}>
                            <WorkItem work={item}></WorkItem>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('WorkAdd')}>
                <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addService')).uri} />
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

export default WorkScreen;