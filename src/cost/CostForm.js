import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { input, globalBackground, detailTitle, button, buttonWrapper, buttonText } from '../../GlobalStyles';

function extractDay(dateString) {
  return dateString.substring(0, 2);
}

function extractMonth(dateString) {
  return dateString.substring(3, 5);
}

function extractYear(dateString) {
  return dateString.substring(6, 10);
}

const CostForm = ({ onSubmit, initialValues, mode }) => {
  const [name, setName] = useState(initialValues.name);
  const [value, setValue] = useState(initialValues.value);

  let day;
  let month;
  let year;
  if (initialValues.addedDate !== undefined) {
    day = extractDay(initialValues.addedDate);
    month = extractMonth(initialValues.addedDate);
    year = extractYear(initialValues.addedDate);
  }
  const [addedDate, setAddedDate] = useState(initialValues.name === '' ? new Date(Date.now()) : new Date(year, month - 1, day));

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || addedDate;
    setAddedDate(currentDate);
  };

  return (
    <>
      <View style={[globalBackground, { alignItems: 'center', height: '100%' }]}>
        <TextInput
          placeholder={'Nazwa kosztu'}
          style={[input, { fontFamily: 'MerriWeatherBold', marginTop: 20 }]}
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Wartość:</Text>
        <NumericInput
          minValue={0}
          rounded={true}
          rightButtonBackgroundColor='#FBACCC'
          leftButtonBackgroundColor='#F1D1D0'
          style={styles.input}
          value={value}
          onChange={text => setValue(text)}
        />

        <View style={{ width: '90%' }}>
          <DateTimePicker
            value={addedDate}
            onChange={onChange}
            display='spinner'
            locale={'pl'}
            style={{ backgroundColor: globalBackground.backgroundColor, marginTop: '5%' }}
          />
        </View>

        <View style={[buttonWrapper]}>
          <TouchableOpacity style={[button]} onPress={() => {
            if (name.length === 0) {
              Alert.alert("Błąd", "Podaj nazwę kosztu")
            } 
            else if (value <= 0) {
              Alert.alert("Błąd", "Podaj wartość kosztu")
            }
            else {
              onSubmit(name, value, addedDate)
            }
          }}>
            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>{mode === 'edit' ? 'Edytuj koszt' : 'Dodaj koszt'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});

export default CostForm;
