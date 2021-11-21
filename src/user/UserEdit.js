import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from './context/UserContext';
import UserForm from './UserForm';
import { headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';

const UserEdit = ({ navigation }) => {
  const id = navigation.getParam('id');

  const { state, editUser } = useContext(Context);

  const user = state.find(user => user.id === id);

  return (
    <UserForm
      mode={'edit'}
      initialValues={{ name: user.name, surname: user.surname, phoneNumber: user.phoneNumber, login: user.login, role: user.role, visible: user.visible }}
      onSubmit={(name, surname, phoneNumber, login, password, role, visible) => {
        editUser(id, name, surname, phoneNumber, login, password, role, visible, () => navigation.pop());
      }}
    />
  );
};

UserEdit.navigationOptions = {
  title: 'Edytowanie pracownika',
  headerTintColor: headerTitleColor,
  headerTitleStyle: {
      fontFamily: 'MerriWeatherBold'
  },
  headerStyle: {
      backgroundColor: headerBackgroundColor,
  },
};

const styles = StyleSheet.create({});

export default UserEdit;