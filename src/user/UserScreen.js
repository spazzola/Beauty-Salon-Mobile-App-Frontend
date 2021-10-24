import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context } from './context/UserContext';
import UserItem from './UserItem';
import { globalBackground } from '../../GlobalStyles';
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
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('User', { id: item.id })}>
                            <UserItem user={item}></UserItem>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('UserAdd')}>
                <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addEmployee')).uri} />
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

export default UserScreen;