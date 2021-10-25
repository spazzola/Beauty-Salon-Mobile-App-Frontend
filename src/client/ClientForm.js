import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { buttonIcons } from '../icons/Icons';
import { input, globalBackground } from '../../GlobalStyles';

const ClientForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);

  return (
    <View style={[globalBackground, { alignItems: 'center', height: '100%' }]}>
      <TextInput
        placeholder={'Imię'}
        style={[input, { fontFamily: 'KalamBold', marginTop: 20 }]}
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        placeholder={'Nazwisko'}
        style={[input, { fontFamily: 'KalamBold' }]}
        value={surname}
        onChangeText={text => setSurname(text)}
      />

      <TextInput
        placeholder={'Numer kom.'}
        style={[input, { fontFamily: 'KalamBold' }]}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />

      <TouchableOpacity onPress={() => onSubmit(name, surname, phoneNumber)}>
        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addClient')).uri} />
      </TouchableOpacity>

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
