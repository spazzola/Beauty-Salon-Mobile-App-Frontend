import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/ClientContext';
import ClientForm from './ClientForm';

const ClientAdd = ({ navigation }) => {
    const { addClient } = useContext(Context);
  
    return (
      <ClientForm
        onSubmit={(name, surname, phoneNumber) => {
          addClient(name, surname, phoneNumber, () => navigation.navigate('Clients'));
        }}
      />
    );
  };
  
  const styles = StyleSheet.create({});
  
  export default ClientAdd;