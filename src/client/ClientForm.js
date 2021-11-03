import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { input, globalBackground, button, buttonText, buttonWrapper } from '../../GlobalStyles';

const ClientForm = ({ onSubmit, initialValues, mode }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);

  return (
    <View style={[globalBackground, { alignItems: 'center', height: '100%' }]}>
      <TextInput
        placeholder={'Imię'}
        style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        placeholder={'Nazwisko'}
        style={[input, { fontFamily: 'MerriWeatherBold' }]}
        value={surname}
        onChangeText={text => setSurname(text)}
      />

      <TextInput
        placeholder={'Numer kom.'}
        style={[input, { fontFamily: 'MerriWeatherBold' }]}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />

      <View style={[buttonWrapper, { marginBottom: 50, marginTop: 30 }]}>
        <TouchableOpacity style={[button, { marginTop: '5%' }]} onPress={() => {
          if (name.length === 0) {
            Alert.alert("Błąd", "Podaj imię klienta");
          }
          else if (surname.length === 0) {
            Alert.alert("Błąd", "Podaj nazwisko klienta");
          }
          else if (phoneNumber.length < 9 || phoneNumber.length > 13) {
            Alert.alert("Błąd", "Podana długość numeru kom. jest błędna");
          } else {
            onSubmit(name, surname, phoneNumber);
          }
        }}>
          <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj klienta' : 'Dodaj klienta'}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

ClientForm.defaultProps = {
  initialValues: {
    name: '',
    surname: '',
    phoneNumber: ''
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

export default ClientForm;
