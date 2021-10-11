import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import ClientScreen from './src/client/ClientScreen';
import { Provider as ClientProvider } from './src/client/context/ClientContext';
import ClientDetail from './src/client/ClientDetail';
import ClientAdd from './src/client/ClientAdd';
import ClientEdit from './src/client/ClientEdit';

import UserScreen from './src/user/UserScreen';
import { Provider as UserProvider } from './src/user/context/UserContext';
import UserDetail from './src/user/UserDetail';
import UserAdd from './src/user/UserAdd';
import UserEdit from './src/user/UserEdit';


const navigator = createStackNavigator({
  Clients: ClientScreen,
  Client: ClientDetail,
  ClientAdd,
  ClientEdit,
  Users: UserScreen,
  User: UserDetail,
  UserAdd,
  UserEdit
}, {
  initialRouteName: 'Users',
  defaultNavigationOptions: {
    title: 'Uzytkownicy'
  }
})

const App = createAppContainer(navigator);

export default () => {
  return <ClientProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ClientProvider>
};