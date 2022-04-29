import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Context } from './context/AuthContext';
import { input, globalBackground, buttonWrapper, button, buttonText } from '../../GlobalStyles';
import { useFonts } from 'expo-font';
import BaseSpinner from '../base_components/BaseSpinner';

const SigninScreen = ({ navigation }) => {
    const { authState, signin } = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const [loaded] = useFonts({
        MerriWeather: require('../../assets/fonts/Merriweather-Regular.ttf'),
        MerriWeatherBold: require('../../assets/fonts/Merriweather-Bold.ttf')
    });

    if (!loaded) {
        return null;
    }


    return <>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'margin' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, { globalBackground }]}>
                    <TextInput
                        value={login}
                        onChangeText={newLogin => setLogin(newLogin)}
                        placeholder={'Login'}
                        autoCapitalize='none'
                        style={[input, { marginLeft: 'auto', marginRight: 'auto', fontFamily: 'MerriWeather' }]}
                    />
                    <TextInput
                        value={password}
                        onChangeText={newPassword => setPassword(newPassword)}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        placeholder={'Hasło'}
                        style={[input, { marginLeft: 'auto', marginRight: 'auto', fontFamily: 'MerriWeather' }]}
                    />

                    <View style={buttonWrapper}>
                        <TouchableOpacity style={[button, { width: 220 }]} onPress={() => {
                            //setShowSpinner(!showSpinner);
                            signin({ login, password });
                            //setShowSpinner(!showSpinner);
                            //navigation.navigate('mainFlow')
                        }}>
                            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Zaloguj</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableWithoutFeedback>
            {showSpinner ?
                <BaseSpinner />
                : null}
        </KeyboardAvoidingView>
    </>
}

// SigninScreen.navigationOptions = () => {
//     return {
//         headerShown: false
//     }
// }

// SigninScreen.navigationOptions = {
//     //title: 'Jakies tam'
//     headerShow: false
// }
SigninScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: '40%'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5FCFF88"
    }
});

export default SigninScreen;