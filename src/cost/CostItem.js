import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { itemContainer, itemParagraph } from '../../GlobalStyles';

const CostItem = ({ cost, index }) => {
    return (
        <View style={{alignItems: 'center'}}>
            <View style={[itemContainer, {backgroundColor: index % 2 === 0 ? '#F875AA' : '#FBACCC'}]}>
                <Text style={[itemParagraph, { fontFamily: 'MerriWeatherBold'}]}> {cost.name} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        marginBottom: 3,
        backgroundColor: 'red'
    },
    paragraph: {
        fontSize: 30,
        flex: 1,
        backgroundColor: 'grey'
    }
});


export default CostItem;