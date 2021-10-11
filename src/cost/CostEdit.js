import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/CostContext';
import CostForm from './CostForm';

const CostEdit = ({ navigation }) => {
  const id = navigation.getParam('id');

  const { state, editCost } = useContext(Context);

  const cost = state.find(cost => cost.id === id);

  return (
    <CostForm
      initialValues={{ name: cost.name, value: cost.value, addedDate: cost.addedDate }}
      onSubmit={(name, value, addedDate) => {
        editCost(id, name, value, addedDate, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CostEdit;