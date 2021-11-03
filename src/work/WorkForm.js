import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, FlatList, ScrollView, SafeAreaView, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { workIcons } from '../icons/Icons';
import { input, globalBackground, detailTitle, button, buttonText, buttonWrapper } from '../../GlobalStyles';

const WorkForm = ({ onSubmit, initialValues, mode }) => {
    const [name, setName] = useState(initialValues.name);
    const [price, setPrice] = useState(initialValues.price);
    const [hoursDuration, setHoursDuration] = useState(initialValues.hoursDuration);
    const [minutesDuration, setMinutesDuration] = useState(initialValues.minutesDuration);
    const [iconName, setIconName] = useState(initialValues.iconName);

    const [myArray, setMyArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [images, setimages] = useState(workIcons);

    return (
        <SafeAreaView style={globalBackground}>
            <ScrollView style={globalBackground} showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: globalBackground.backgroundColor, alignItems: 'center' }}>

                    <TextInput
                        placeholder={'Nazwa usługi'}
                        style={[input, { fontFamily: 'MerriWeatherBold' }]}
                        value={name}
                        onChangeText={text => setName(text)}
                    />

                    <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Wartość:</Text>
                    <NumericInput
                        minValue={0}
                        rounded={true}
                        rightButtonBackgroundColor='#FBACCC'
                        leftButtonBackgroundColor='#F1D1D0'
                        style={styles.input}
                        value={price}
                        onChange={text => setPrice(text)}
                    />

                    <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Czas trwania godziny:</Text>
                    <NumericInput
                        minValue={0}
                        rounded={true}
                        rightButtonBackgroundColor='#FBACCC'
                        leftButtonBackgroundColor='#F1D1D0'
                        style={styles.input}
                        value={hoursDuration}
                        onChange={text => setHoursDuration(text)}
                    />

                    <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Czas trwania minuty:</Text>
                    <NumericInput
                        minValue={0}
                        rounded={true}
                        step={5}
                        rightButtonBackgroundColor='#FBACCC'
                        leftButtonBackgroundColor='#F1D1D0'
                        style={styles.input}
                        value={minutesDuration}
                        onChange={text => setMinutesDuration(text)}
                    />

                    <View style={{ height: 300 }}>
                        <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold', textAlign: 'center', justifyContent: 'center' }]}>Wybrana ikona:</Text>
                        {iconName === '' ? null : <Image style={styles.icon} source={(workIcons.find(icon => icon.name === iconName)).uri} />}

                        <SafeAreaView style={{ height: 200 }}>
                            <ScrollView>
                                <FlatList
                                    vertical={true}
                                    showsVerticalScrollIndicator={false}
                                    data={images}
                                    keyExtractor={item => item.name}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => setIconName(item.name)}>
                                            <Image source={item.uri}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    marginLeft: 50,
                                                    marginTop: 20,
                                                    //resizeMode: 'contain',
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView>
                        </SafeAreaView>

                    </View>
                    
                    <View style={[buttonWrapper, { marginBottom: 50, marginTop: 30 }]}>
                        <TouchableOpacity style={[button, { marginTop: '5%' }]} onPress={() => {
                            if (name.length === 0) {
                                Alert.alert("Błąd", "Podaj nazwę usługi");
                            }
                            else if (price === 0) {
                                Alert.alert("Błąd", "Podaj wartość usługi");
                            }
                            else if (hoursDuration === 0 && minutesDuration === 0) {
                                Alert.alert("Błąd", "Podaj czas trwania usługi");
                            }
                            else if (iconName === '') {
                                Alert.alert("Błąd", "Wybierz ikonę")
                            }
                            else {
                                onSubmit(name, price, hoursDuration, minutesDuration, iconName);
                            }
                            }}>
                            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj usługę' : 'Dodaj usługę'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

WorkForm.defaultProps = {
    initialValues: {
        name: '',
        price: 0,
        hoursDuration: 0,
        minutesDuration: 0,
        iconName: ''
    }
};

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 5
    },
    label: {
        marginTop: 20
    },
    container: {
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        height: 400
    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        width: 170,
        height: 90
    }
});

export default WorkForm;
