import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from './context/UserContext';
import UserItem from './UserItem';

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
        <View>
            <Text>User screen !!! {state.length}</Text>
            <Button title="Dodaj uzytkownika" onPress={() => navigation.navigate('UserAdd')}/>
            <FlatList 
                data={state}
                keyExtractor={user => user.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('User', { id: item.id })}>
                            <UserItem user={item}></UserItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default UserScreen;