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

import CostScreen from './src/cost/CostScreen';
import { Provider as CostProvider } from './src/cost/context/CostContext';
import CostDetail from './src/cost/CostDetail';
import CostAdd from './src/cost/CostAdd';
import CostEdit from './src/cost/CostEdit';


const navigator = createStackNavigator({
  Clients: ClientScreen,
  Client: ClientDetail,
  ClientAdd,
  ClientEdit,

  Users: UserScreen,
  User: UserDetail,
  UserAdd,
  UserEdit,

  Costs: CostScreen,
  Cost: CostDetail,
  CostAdd,
  CostEdit

}, {
  initialRouteName: 'Costs',
  defaultNavigationOptions: {
    title: 'Koszty'
  }
})

const App = createAppContainer(navigator);

export default () => {
  return <CostProvider>
    <ClientProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ClientProvider>
  </CostProvider>
};