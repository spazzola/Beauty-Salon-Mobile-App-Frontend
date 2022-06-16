import React, { Image, Text } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
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

import AppointmentCalendar from './src/appointment/AppointmentCalendar';
import AppointmentScreen from './src/appointment/AppointmentScreen';
import { Provider as AppointmentProvider } from './src/appointment/context/AppointmentContext';
import AppointmentAdd from './src/appointment/AppointmentAdd';
import AppointmentDetail from './src/appointment/AppointmentDetail';
import AppointmentEdit from './src/appointment/AppointmentEdit';

import SigninScreen from './src/signin/SigninScreen';
import { Provider as AuthProvider } from './src/signin/context/AuthContext';

import ReportScreen from './src/report/ReportScreen';
import { Provider as ReportProvider } from './src/report/context/ReportContext';

import SettingsScreen from './src/settings/SettingsScreen';
import { Provider as SettingsProvider } from './src/settings/context/SettingsContext';

import VacationScreen from './src/settings/vacation/VacationScreen';
import VacationAdd from './src/settings/vacation/VacationAdd';
import VacationEdit from './src/settings/vacation/VacationEdit';

import { setNavigator } from './src/navigationRef';


const headerBackgroundColor = "#F1D1D0"

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: SigninScreen
  }),
  mainFlow: createStackNavigator({
    Clients: {
      screen: ClientScreen
    },
    Client: {
      screen: ClientDetail
    },
    ClientAdd: {
      screen: ClientAdd
    },
    ClientEdit: {
      screen: ClientEdit
    },

    Users: {
      screen: UserScreen
    },
    User: {
      screen: UserDetail
    },
    UserAdd: {
      screen: UserAdd
    },
    UserEdit: {
      screen: UserEdit
    },

    Costs: {
      screen: CostScreen
    },
    Cost: {
      screen: CostDetail
    },
    CostAdd: {
      screen: CostAdd
    },
    CostEdit: {
      screen: CostEdit
    },

    Solarium: {
      screen: SolariumScreen
    },

    Works: {
      screen: WorkScreen
    },
    Work: {
      screen: WorkDetail
    },
    WorkAdd: {
      screen: WorkAdd
    },
    WorkEdit: {
      screen: WorkEdit
    },

    AppointmentCalendar: {
      screen: AppointmentCalendar
    },
    Appointments: {
      screen: AppointmentScreen
    },
    AppointmentAdd: {
      screen: AppointmentAdd
    },
    Appointment: {
      screen: AppointmentDetail
    },
    AppointmentEdit: {
      screen: AppointmentEdit
    },

    Reports: {
      screen: ReportScreen
    },

    Settings: {
      screen: SettingsScreen
    },
    Vacation: {
      screen: VacationScreen
    },
    VacationAdd: {
      screen: VacationAdd
    },
    VacationEdit: {
      screen: VacationEdit
    }
  },
    {
      initialRouteName: 'AppointmentCalendar',
    })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return <AuthProvider>
    <ReportProvider>
      <AppointmentProvider>
        <WorkProvider>
          <SolariumProvider>
            <CostProvider>
              <ClientProvider>
                <UserProvider>
                  <SettingsProvider>
                    <App ref={(navigator) => { setNavigator(navigator) }}/>
                  </SettingsProvider>
                </UserProvider>
              </ClientProvider>
            </CostProvider>
          </SolariumProvider>
        </WorkProvider>
      </AppointmentProvider>
    </ReportProvider>
  </AuthProvider>
};