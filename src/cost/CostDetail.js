import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Context } from './context/CostContext';
import { detailParagraph, detailTitle, globalBackground, button, buttonWrapper, buttonText, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import BaseSpinner from '../base_components/BaseSpinner';


const CostDetail = ({ navigation }) => {
    const { state, deleteCost } = useContext(Context);
    const [showSpinner, setShowSpinner] = useState(false);

    const cost = state.find((cost) => cost.id === navigation.getParam('id'));

    return (
        <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
            <View style={[globalBackground, { height: '20%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>

                <View>
                    <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwa:</Text>
                    <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Wartość:</Text>
                </View>

                <View>
                    <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {cost.name}</Text>
                    <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {cost.value} zł</Text>
                </View>
            </View>

            <View style={buttonWrapper}>
                <TouchableOpacity style={button} onPress={() => navigation.navigate('CostEdit', { id: navigation.getParam('id') })}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={() => {
                    Alert.alert(
                        "Usuwanie kosztu",
                        "Czy napewno chcesz usunąc koszt?",
                        [
                            {
                                text: "Nie",
                                style: "cancel"
                            },
                            {
                                text: "Tak", onPress: async () => {
                                    setShowSpinner(!showSpinner);
                                    deleteCost(cost.id);
                                    navigation.navigate('Costs');
                                    setShowSpinner(!showSpinner);
                                }
                            }
                        ]
                    );
                }}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usuń</Text>
                </TouchableOpacity>
            </View>
            {showSpinner ?
                <BaseSpinner />
                : null}
        </View>
    );
}

CostDetail.navigationOptions = {
    title: 'Koszt',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};


const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    },
    button: {
        width: 160,
        height: 80
    }
});

export default CostDetail;