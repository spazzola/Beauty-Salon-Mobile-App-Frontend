import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/UserContext';
import UserForm from './UserForm';

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
  
  const styles = StyleSheet.create({});
  
  export default UserAdd;