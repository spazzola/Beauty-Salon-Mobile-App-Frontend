import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ClientForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [surname, setSurname] = useState(initialValues.surname);
  const [phoneNumber, setPhoneNumber] = useState(initialValues.phoneNumber);

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
      <Text style={styles.label}>Numer kom.:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <Button title="Dodaj klienta" onPress={() => onSubmit(name, surname, phoneNumber)} />
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
  }
});

export default ClientForm;
