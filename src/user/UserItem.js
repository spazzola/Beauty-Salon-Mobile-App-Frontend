import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

function formatDisplayedName(name, surname) {
    const fullNameLength = name.length + surname.length;
    let fullName = name + ' ' + surname;
    return fullNameLength >= 21 ? (fullName.substring(0, 21) + "...") : fullName;
}

const UserItem = ({ user, index }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={[itemContainer, {backgroundColor: index % 2 === 0 ? '#F875AA' : '#FBACCC'}]}>
                <Text style={[itemParagraph, { fontFamily: 'MerriWeatherBold' }]}> {formatDisplayedName(user.name, user.surname)} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});


export default UserItem;