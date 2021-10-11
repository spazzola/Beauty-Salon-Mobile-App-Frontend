import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/UserContext';
import UserForm from './UserForm';

const UserEdit = ({ navigation }) => {
  const id = navigation.getParam('id');

  const { state, editUser } = useContext(Context);

  const user = state.find(user => user.id === id);

  return (
    <UserForm
      initialValues={{ name: user.name, surname: user.surname, phoneNumber: user.phoneNumber, login: user.login }}
      onSubmit={(name, surname, phoneNumber, login, password) => {
        editUser(id, name, surname, phoneNumber, login, password, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default UserEdit;