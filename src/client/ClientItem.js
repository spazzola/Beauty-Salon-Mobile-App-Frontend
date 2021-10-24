import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const ClientItem = ({ client }) => {

    return (
        <View style={itemContainer}>
            <Text style={itemParagraph}> {client.name} {client.surname}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});


export default ClientItem;