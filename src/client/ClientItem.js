import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

const windowWidth = Dimensions.get('window').width;

function formatDisplayedName(name, surname) {
    const fullNameLength = name.length + surname.length;
    let fullName = name + ' ' + surname;
    return fullNameLength >= 21 ? (fullName.substring(0, 21) + "...") : fullName;
}

const ClientItem = ({ client, index }) => {

    return (
        <View style={{alignItems: 'center'}}>
            <View style={[itemContainer, {backgroundColor: index % 2 === 0 ? '#F875AA' : '#FBACCC'}]}>
                <Text style={[itemParagraph, { fontFamily: 'MerriWeatherBold' }]}> {formatDisplayedName(client.name, client.surname)} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});


export default ClientItem;