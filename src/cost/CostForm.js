import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'

const CostForm = ({ onSubmit, initialValues }) => {
  console.log("TUTAJ JESTEM: " + new Date(initialValues.addedDate));
  const [name, setName] = useState(initialValues.name);
  const [value, setValue] = useState(initialValues.value);
  const [addedDate, setAddedDate] = useState(initialValues.name === null ? new Date(Date.now()) : new Date(initialValues.addedDate));

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || addedDate;
    setAddedDate(currentDate);
  };

  return (
    <View>
      <Text style={styles.label}>Nazwa:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>Wartość:</Text>
      <NumericInput
        style={styles.input}
        value={value}
        onChange={text => setValue(text)}
      />
      <DateTimePicker
        value={addedDate}
        onChange={onChange}
        display='spinner'
      />
      <Button title="Dodaj koszt" onPress={() => { onSubmit(name, value, addedDate) }} />
    </View>
  );
};

CostForm.defaultProps = {
  initialValues: {
    name: '',
    value: 0,
    addedDate: ''
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

export default CostForm;
