import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/CostContext';

const CostDetail = ({ navigation }) => {
    const { state, deleteCost } = useContext(Context);

    const cost = state.find((cost) => cost.id === navigation.getParam('id'));

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Nazwa: </Text> {cost.name}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Wartość: </Text> {cost.value}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edytuj" onPress={() => navigation.navigate('CostEdit', { id: navigation.getParam('id') })} />
                <Button title="Usuń" onPress={() => {
                    navigation.navigate('Costs')
                    deleteCost(cost.id)
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

export default CostDetail;