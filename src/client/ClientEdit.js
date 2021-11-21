import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/ClientContext';
import ClientForm from './ClientForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const ClientEdit = ({ navigation }) => {
  const id = navigation.getParam('id');

  const { state, editClient } = useContext(Context);

  const client = state.find(client => client.id === id);

  return (
    <ClientForm
      mode={'edit'}
      initialValues={{ name: client.name, surname: client.surname, phoneNumber: client.phoneNumber, belatedCounter: client.belatedCounter }}
      onSubmit={(name, surname, phoneNumber, belatedCounter) => {
        editClient(id, name, surname, phoneNumber, belatedCounter, () => navigation.pop());
      }}
    />
  );
};

ClientEdit.navigationOptions = {
  title: 'Edytowanie klienta',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
      fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
      backgroundColor: headerBackgroundColor,
  },
};

const styles = StyleSheet.create({});

export default ClientEdit;