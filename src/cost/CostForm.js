import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { input, globalBackground, detailTitle, button, buttonWrapper, buttonText } from '../../GlobalStyles';

const CostForm = ({ onSubmit, initialValues, mode }) => {
  const [name, setName] = useState(initialValues.name);
  const [value, setValue] = useState(initialValues.value);
  const [addedDate, setAddedDate] = useState(initialValues.name === '' ? new Date(Date.now()) : new Date(initialValues.addedDate));

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

        <View style={{width: '90%'}}>
          <DateTimePicker
            value={addedDate}
            onChange={onChange}
            display='spinner'
            style={{ backgroundColor: globalBackground.backgroundColor, marginTop: '5%' }}
          />
        </View>

        <View style={[buttonWrapper]}>
          <TouchableOpacity style={[button]} onPress={() => { onSubmit(name, value, addedDate) }}>
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
