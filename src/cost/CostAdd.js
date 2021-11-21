import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/CostContext';
import CostForm from './CostForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const CostAdd = ({ navigation }) => {
  const { addCost } = useContext(Context);

  return (
    <CostForm
      onSubmit={(name, value, addedDate) => {
        addCost(name, value, addedDate, () => navigation.navigate('Costs'));
      }}
    />
  );
};

CostAdd.navigationOptions = {
  title: 'Dodawanie kosztu',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
    fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
    backgroundColor: headerBackgroundColor,
  },
};


const styles = StyleSheet.create({});

export default CostAdd;