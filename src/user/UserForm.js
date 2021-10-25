import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { buttonIcons } from '../icons/Icons';
import { input, globalBackground } from '../../GlobalStyles';

const UserForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
  const [login, setLogin] = useState(initialValues.login);
  const [password, setPassword] = useState(initialValues.password);
  const [confirmPassword, setConfirmPassword] = useState(initialValues.confirmPassword);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalBackground, { alignItems: 'center', height: '100%', justifyContent: 'space-around' }]}>
          <TextInput
            placeholder={'Imię'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={name}
            onChangeText={text => setName(text)}
          />

          <TextInput
            placeholder={'Nazwisko'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={surname}
            onChangeText={text => setSurname(text)}
          />

          <TextInput
            placeholder={'Numer kom.'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />

          <TextInput
            placeholder={'Login'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={login}
            onChangeText={text => setLogin(text)}
          />

          <TextInput
            placeholder={'Hasło'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={password}
            secureTextEntry={true}
            autoCapitalize='none'
            onChangeText={text => setPassword(text)}
          />

          <TextInput
            placeholder={'Potwierdź hasło'}
            style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize='none'
            onChangeText={text => setConfirmPassword(text)}
          />

          <TouchableOpacity onPress={() => {
            if (password === confirmPassword) {
              onSubmit(name, surname, phoneNumber, login, password);
            } else {
              alert("Hasla sie roznia kurwa");
            }
          }} >
            <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addClient')).uri} />
          </TouchableOpacity>
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
