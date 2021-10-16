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

import SolariumScreen from './src/solarium/SolariumScreen';
import { Provider as SolariumProvider } from './src/solarium/context/SolariumContext';

import WorkScreen from './src/work/WorkScreen';
import { Provider as WorkProvider } from './src/work/context/WorkContext';
import WorkDetail from './src/work/WorkDetail';
import WorkAdd from './src/work/WorkAdd';
import WorkEdit from './src/work/WorkEdit';

import AppointmentScreen from './src/appointment/AppointmentScreen';
import { Provider as AppointmentProvider } from './src/appointment/context/AppointmentContext';
import AppointmentAdd from './src/appointment/AppointmentAdd';

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
  CostEdit,

  Solarium: SolariumScreen,

  Works: WorkScreen,
  Work: WorkDetail,
  WorkAdd,
  WorkEdit,

  Appointments: AppointmentScreen,
  AppointmentAdd
}, {
  initialRouteName: 'Appointments',
  defaultNavigationOptions: {
    title: 'Wizyty'
  }
})

const App = createAppContainer(navigator);

export default () => {
  return <AppointmentProvider>
    <WorkProvider>
      <SolariumProvider>
        <CostProvider>
          <ClientProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ClientProvider>
        </CostProvider>
      </SolariumProvider>
    </WorkProvider>
  </AppointmentProvider>
};