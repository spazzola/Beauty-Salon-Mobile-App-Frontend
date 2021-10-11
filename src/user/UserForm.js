import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const UserForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);
  const [login, setLogin] = useState(initialValues.login);
  const [password, setPassword] = useState(initialValues.password);
  const [confirmPassword, setConfirmPassword] = useState(initialValues.confirmPassword);
  

  return (
    <View>
      <Text style={styles.label}>Imię:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>Nazwisko:</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={text => setSurname(text)}
      />
      <Text style={styles.label}>Telefon kom:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Text style={styles.label}>Login:</Text>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={text => setLogin(text)}
      />
      <Text style={styles.label}>Hasło:</Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry={true}
        autoCapitalize='none'
        onChangeText={text => setPassword(text)}
      />
      <Text style={styles.label}>Powtórz hasło:</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        secureTextEntry={true}
        autoCapitalize='none'
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Dodaj uzytkownika" onPress={() => {
        if (password === confirmPassword) {
          onSubmit(name, surname, phoneNumber, login, password);
        } else {
          alert("Hasla sie roznia kurwa");
        }
      }} />
    </View>
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
    margin: 5,
    marginBottom: 20
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default UserForm;
