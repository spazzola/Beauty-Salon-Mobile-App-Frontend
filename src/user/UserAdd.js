import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/UserContext';
import UserForm from './UserForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const UserAdd = ({ navigation }) => {
    const { addUser } = useContext(Context);
  
    return (
      <UserForm
        onSubmit={(name, surname, phoneNumber, login, password) => {
          addUser(name, surname, phoneNumber, login, password,  () => navigation.navigate('Users'));
        }}
      />
    );
  };
  
  UserAdd.navigationOptions = {
    title: 'Dodawanie pracownika',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

  const styles = StyleSheet.create({});
  
  export default UserAdd;