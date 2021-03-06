import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/CostContext';
import CostForm from './CostForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const CostEdit = ({ navigation }) => {
  const id = navigation.getParam('id');

  const { state, editCost } = useContext(Context);

  const cost = state.find(cost => cost.id === id);

  return (
    <CostForm
      mode={'edit'}
      initialValues={{ name: cost.name, value: cost.value, addedDate: cost.addedDate }}
      onSubmit={(name, value, addedDate) => {
        editCost(id, name, value, addedDate, () => navigation.pop());
      }}
    />
  );
};

CostEdit.navigationOptions = {
  title: 'Edytowanie kosztu',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
    fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
    backgroundColor: headerBackgroundColor,
  },
};

const styles = StyleSheet.create({});

export default CostEdit;