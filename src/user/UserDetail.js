import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/UserContext';

const UserDetail = ({ navigation }) => {
    const { state, deleteUser } = useContext(Context);

    const user = state.find((user) => user.id === navigation.getParam('id'));

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Imię: </Text> {user.name}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Nazwisko: </Text> {user.surname}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Telefon kom: </Text> {user.phoneNumber}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Login: </Text> {user.login}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edytuj" onPress={() => navigation.navigate('UserEdit', { id: navigation.getParam('id') })} />
                <Button title="Usuń" onPress={() => {
                    navigation.navigate('Users')
                    deleteUser(user.id)
                    }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    }
});

export default UserDetail;