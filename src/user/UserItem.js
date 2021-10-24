import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

const UserItem = ({ user }) => {
    return (
        <View style={itemContainer}>
            <Text style={itemParagraph}> {user.name} {user.surname}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});


export default UserItem;