import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/CostContext';
import CostForm from './CostForm';

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
  
  const styles = StyleSheet.create({});
  
  export default CostAdd;