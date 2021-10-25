import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { buttonIcons } from '../icons/Icons';
import { detailTitle } from '../../GlobalStyles';

const SolariumForm = ({ onSubmit, initialValues }) => {
  const [usedTime, setUsedTime] = useState(initialValues.usedTime);
  const [usedDate, setUsedDate] = useState(new Date(Date.now()));

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || usedDate;
    setUsedDate(currentDate);
  };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>

      <View>
        <Text style={[detailTitle, styles.label, { fontFamily: 'KalamBold', textAlign: 'center' }]}>Wartość:</Text>
        <NumericInput
          minValue={0}
          rounded={true}
          rightButtonBackgroundColor='#ED50F1'
          leftButtonBackgroundColor='#FDB9FC'
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

      <TouchableOpacity onPress={() => { onSubmit(usedTime, usedDate) }}>
        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'solariumActive')).uri} />
      </TouchableOpacity>

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
