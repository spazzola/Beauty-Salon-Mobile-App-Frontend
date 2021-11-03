import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { buttonIcons } from '../icons/Icons';
import { input, globalBackground, button, buttonText, buttonWrapper } from '../../GlobalStyles';

function numberIsNotValid(phoneNumber) {
  const spaceIndex = phoneNumber.indexOf(" ");
  const firstPart = phoneNumber.substring(0, spaceIndex);
  const secondPart = phoneNumber.substring(spaceIndex + 1, phoneNumber.length);
  const numberWithoutWhiteSpace = firstPart + secondPart;

  return !isFinite(numberWithoutWhiteSpace);
}

const UserForm = ({ onSubmit, initialValues, mode }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
  const [login, setLogin] = useState(initialValues.login);
  const [password, setPassword] = useState(initialValues.password);
  const [confirmPassword, setConfirmPassword] = useState(initialValues.confirmPassword);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalBackground, { alignItems: 'center', height: '100%', justifyContent: 'space-around' }]}>
          <TextInput
            placeholder={'Imię'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={name}
            onChangeText={text => setName(text)}
          />

          <TextInput
            placeholder={'Nazwisko'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={surname}
            onChangeText={text => setSurname(text)}
          />

          <TextInput
            placeholder={'Numer kom.'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />

          <TextInput
            placeholder={'Login'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={login}
            onChangeText={text => setLogin(text)}
          />

          <TextInput
            placeholder={'Hasło'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={password}
            secureTextEntry={true}
            autoCapitalize='none'
            onChangeText={text => setPassword(text)}
          />

          <TextInput
            placeholder={'Potwierdź hasło'}
            style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize='none'
            onChangeText={text => setConfirmPassword(text)}
          />

          <View style={[buttonWrapper, { marginBottom: 50, marginTop: 30 }]}>
            <TouchableOpacity style={[button, { marginTop: '5%', width: 210 }]} onPress={() => {

              if(name.length === 0) {
                Alert.alert("Błąd", "Podaj imię pracownika");
              } 
              else if(surname.length === 0) {
                Alert.alert("Błąd", "Podaj nazwisko pracownika");
              }
              else if (numberIsNotValid(phoneNumber)) {
                Alert.alert("Błąd", "Podany numer kom. zawiera błędne znaki");
              }
              else if(phoneNumber.length < 9 || phoneNumber.length > 13) {
                Alert.alert("Błąd", "Podana długość numeru kom. jest błędna");
              }
              else if (login.length === 0) {
                Alert.alert("Błąd", "Podaj login");
              }
              else if (password !== confirmPassword) {
                Alert.alert("Błąd", "Podane hasła różnią się od siebie");
              } else {
                onSubmit(name, surname, phoneNumber, login, password);
              }
            }}>
              <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj pracownika' : 'Dodaj pracownika'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

UserForm.defaultProps = {
  initialValues: {
    name: '',
    surname: '',
    phoneNumber: '',
    login: '',
  }
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  },
  button: {
    marginTop: 20,
    width: 170,
    height: 90
  }
});

export default UserForm;
