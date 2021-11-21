import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/ClientContext';
import ClientForm from './ClientForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

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

ClientAdd.navigationOptions = {
  title: 'Dodawanie klienta',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
    fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
    backgroundColor: headerBackgroundColor,
  },
};

const styles = StyleSheet.create({});

export default ClientAdd;