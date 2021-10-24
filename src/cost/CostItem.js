import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

const CostItem = ({ cost }) => {
    return (
        <View style={itemContainer}>
            <Text style={itemParagraph}> {cost.name} {cost.value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        marginBottom: 3,
    },
    paragraph: {
        fontSize: 30,
        flex: 1,
        backgroundColor: 'grey'
    }
});


export default CostItem;