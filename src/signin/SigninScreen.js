import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import { Context } from './context/AuthContext';
import { input, globalBackground, buttonWrapper, button, buttonText } from '../../GlobalStyles';
import { useFonts } from 'expo-font';

const SigninScreen = ({ navigation }) => {
    const { authState, signin } = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
                            signin({ login, password });
                            //navigation.navigate('mainFlow')
                         }}>
                            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Zaloguj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    }
});

export default SigninScreen;