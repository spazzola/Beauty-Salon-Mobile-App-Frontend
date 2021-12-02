import React, { useContext, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Context } from './context/ClientContext';
import ClientForm from './ClientForm';
import { headerBackgroundColor, headerTitleColor, button, buttonText } from '../../GlobalStyles';
import BaseSpinner from '../base_components/BaseSpinner';

const ClientAdd = ({ navigation }) => {
  const { addClient, addClients } = useContext(Context);
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <>
      <View>
        <ClientForm
          onSubmit={(name, surname, phoneNumber) => {
            addClient(name, surname, phoneNumber, () => navigation.navigate('Clients'));
          }}
        />
      </View>

      <TouchableOpacity style={[styles.wrapper, button, { width: 210 }]} onPress={async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          setShowSpinner(!showSpinner);
          const { data } = await Contacts.getContactsAsync({});
          if (data.length > 0) {
            clients = data.map(contact => {
              if (contact.firstName !== undefined && contact.lastName !== undefined && contact.phoneNumbers !== undefined) {
                return {
                  name: contact.firstName,
                  surname: contact.lastName,
                  phoneNumber: contact.phoneNumbers[0].number
                };
              }
            });
            const filteredContacts = clients.filter(client => client !== undefined);
            const response = await addClients(filteredContacts);
            navigation.navigate('Clients');
            setShowSpinner(!showSpinner);
          }
        }
      }}>
        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Importuj kontakty</Text>
      </TouchableOpacity>
      {showSpinner ?
        <BaseSpinner />
        : null}
    </>
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

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: '55%',
    left: '22%',
    //zIndex: 1,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 3
  }
});

export default ClientAdd;