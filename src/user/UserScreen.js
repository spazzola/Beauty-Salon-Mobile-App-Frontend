import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Context } from './context/UserContext';
import UserItem from './UserItem';
import { globalBackground, button, buttonText, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import { buttonIcons } from '../icons/Icons';

const UserScreen = ({ navigation }) => {
    const { state, addUser, getUsers } = useContext(Context);

    useEffect(() => {
        getUsers();

        const listener = navigation.addListener('didFocus', () => {
            getUsers();
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
                        fb = b.name.toLowerCase(),
                        fasurname = a.surname.toLowerCase(),
                        fbsurname = b.surname.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    if (fa < fb || fasurname < fbsurname) {
                        return -1
                    }
                    return 0
                    //return a.name.localeCompare(b.name); //using String.prototype.localCompare()
                })}
                keyExtractor={user => user.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('User', { id: item.id })}>
                            <UserItem user={item} index={index}></UserItem>
                        </TouchableOpacity>
                    );
                }}
            />

            <TouchableOpacity style={[styles.wrapper, button, {width: 210}]} onPress={() => navigation.navigate('UserAdd')}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj pracownika</Text>
            </TouchableOpacity>
        </View>
    );
}

UserScreen.navigationOptions = {
    title: 'Personel',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    wrapper: {
        position: 'absolute',
        top: '87%',
        left: '38%',
        zIndex: 1,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
    }
})

export default UserScreen;