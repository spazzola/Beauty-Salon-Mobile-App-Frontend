import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Context } from './context/WorkContext';
import { workIcons, buttonIcons } from '../icons/Icons';
import { globalBackground, detailParagraph, detailTitle, button, buttonWrapper, buttonText } from '../../GlobalStyles';

const WorkDetail = ({ navigation }) => {
    const { state, deleteWork } = useContext(Context);

    const work = state.find((work) => work.id === navigation.getParam('id'));
    const icon = workIcons.find((icon) => icon.name === work.iconName);

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>

                    <View>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwa:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Wartość:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Czas trwania:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Wybrana ikona:</Text>
                    </View>

                    <View>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {work.name}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {work.price}zł</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {work.hoursDuration}h {work.minutesDuration}min</Text>
                        <Text style={detailParagraph}> <Image style={{ marginLeft: 50, maxWidth: 30, maxHeight: 30 }} source={icon.uri} /></Text>
                    </View>
                </View>

                <View style={buttonWrapper}>
                    <TouchableOpacity style={button} onPress={() => navigation.navigate('WorkEdit', { id: navigation.getParam('id') })}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => {
                        Alert.alert(
                            "Usuwanie usługi",
                            "Czy napewno chcesz usunąć usługę?",
                            [
                                {
                                    text: "Nie",
                                    style: "cancel"
                                },
                                {
                                    text: "Tak", onPress: async () => {
                                        navigation.navigate('Works');
                                        deleteWork(work.id);
                                    }
                                }
                            ]
                        );
                    }}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usuń</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

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

export default WorkDetail;