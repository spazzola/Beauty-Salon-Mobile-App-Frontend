import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { detailTitle, buttonText, buttonWrapper, button } from '../../GlobalStyles';
import BaseSpinner from '../base_components/BaseSpinner';


const SolariumForm = ({ onSubmit, getSolarium, initialValues }) => {
  const [usedTime, setUsedTime] = useState(initialValues.usedTime);
  const [usedDate, setUsedDate] = useState(new Date(Date.now()));
  const [showSpinner, setShowSpinner] = useState(false);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || usedDate;
    setUsedDate(currentDate);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>

      <View>
        <Text style={[detailTitle, styles.label, { fontFamily: 'NotoSerif', textAlign: 'center' }]}>Minuty:</Text>
        <NumericInput
          minValue={0}
          rounded={true}
          rightButtonBackgroundColor='#FBACCC'
          leftButtonBackgroundColor='#F1D1D0'
          inputStyle={{ fontFamily: 'MerriWeatherBold' }}
          style={styles.input}
          value={usedTime}
          onChange={text => setUsedTime(text)}
        />
      </View>

      <View style={{ width: '100%', marginTop: 20 }}>
        <DateTimePicker
          display={'spinner'}
          value={usedDate}
          onChange={onChange}
        />
      </View>

      <View style={buttonWrapper}>
        <TouchableOpacity style={[button, { width: 220 }]} onPress={() => {
          if (usedTime === 0) {
            Alert.alert("Błąd", "Podaj ilość minut");
          } else {
            setShowSpinner(!showSpinner);
            onSubmit(usedTime, usedDate);
            setShowSpinner(false);
          }
        }}>
          <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Potwierdź solarium</Text>
        </TouchableOpacity>
      </View>
      <View style={buttonWrapper}>
        <TouchableOpacity style={[button, { width: 220 }]} onPress={() => {
          setShowSpinner(!showSpinner);
          getSolarium(usedDate);
          setShowSpinner(false);
        }}>
          <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Pobierz solarium</Text>
        </TouchableOpacity>
      </View>
      {showSpinner ?
        <BaseSpinner />
        : null}
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
  },
  label: {
    marginTop: 20
  },
  button: {
    marginTop: 20,
    width: 170,
    height: 90
  }
});

export default SolariumForm;
