import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';

const SolariumForm = ({ onSubmit, initialValues }) => {
  const [usedTime, setUsedTime] = useState(initialValues.usedTime);
  const [usedDate, setUsedDate] = useState(new Date(Date.now()));

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || usedDate;
    setUsedDate(currentDate);
  };

  return (
    <View>
      <Text style={styles.label}>Wartość:</Text>
      <NumericInput
        style={styles.input}
        value={usedTime}
        onChange={text => setUsedTime(text)}
      />
      <DateTimePicker
        value={usedDate}
        onChange={onChange}
      />
      <Button title="Uzyj solarium" onPress={() => { onSubmit(usedTime, usedDate) }} />
    </View>
  );
};

SolariumForm.defaultProps = {
  initialValues: {
    usedTime: 0
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

export default SolariumForm;
