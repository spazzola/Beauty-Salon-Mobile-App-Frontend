import React, { Image, Text } from 'react';
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

import AppointmentCalendar from './src/appointment/AppointmentCalendar';
import AppointmentScreen from './src/appointment/AppointmentScreen';
import { Provider as AppointmentProvider } from './src/appointment/context/AppointmentContext';
import AppointmentAdd from './src/appointment/AppointmentAdd';
import AppointmentDetail from './src/appointment/AppointmentDetail';
import AppointmentEdit from './src/appointment/AppointmentEdit';

import ReportScreen from './src/report/ReportScreen';
import { Provider as ReportProvider } from './src/report/context/ReportContext';

const headerBackgroundColor = "#F1D1D0"

const navigator = createStackNavigator({


  Clients: {
    screen: ClientScreen,
    navigationOptions: {
      title: 'Klienci',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  Client: {
    screen: ClientDetail,
    navigationOptions: {
      title: 'Klient',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  ClientAdd: {
    screen: ClientAdd,
    navigationOptions: {
      title: 'Dodawanie klienta',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  ClientEdit: {
    screen: ClientEdit,
    navigationOptions: {
      title: 'Edytowanie klienta',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },

  Users: {
    screen: UserScreen,
    navigationOptions: {
      title: 'Personel',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  User: {
    screen: UserDetail,
    navigationOptions: {
      title: 'Pracownik',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  UserAdd: {
    screen: UserAdd,
    navigationOptions: {
      title: 'Dodawanie pracownika',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  UserEdit: {
    screen: UserEdit,
    navigationOptions: {
      title: 'Edytowanie pracownika',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },

  Costs: {
    screen: CostScreen,
    navigationOptions: {
      title: 'Koszty',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  Cost: {
    screen: CostDetail,
    navigationOptions: {
      title: 'Koszt',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  CostAdd: {
    screen: CostAdd,
    navigationOptions: {
      title: 'Dodawanie kosztu',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  CostEdit: {
    screen: CostEdit,
    navigationOptions: {
      title: 'Edycja kosztu',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },

  Solarium: {
    screen: SolariumScreen,
    navigationOptions: {
      title: 'Solarium',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },

  Works: {
    screen: WorkScreen,
    navigationOptions: {
      title: 'Usługi',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  Work: {
    screen: WorkDetail,
    navigationOptions: {
      title: 'Usługa',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  WorkAdd: {
    screen: WorkAdd,
    navigationOptions: {
      title: 'Dodawanie usługi',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  WorkEdit: {
    screen: WorkEdit,
    navigationOptions: {
      title: 'Edytowanie usługi',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },

  AppointmentCalendar: {
    screen: AppointmentCalendar,
    navigationOptions: {
      title: 'Kalendarz',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
      headerBackTitleStyle: {
        color: 'red'
      }
      // headerTitleStyle: {
      //   fontFamily: 'Kalam-Bold'
      // }
    }
  },
  Appointments: {
    screen: AppointmentScreen,
    navigationOptions: {
      title: 'Wizyty',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  AppointmentAdd: {
    screen: AppointmentAdd,
    navigationOptions: {
      title: 'Dodawanie wizyty',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
      options: {
        // headerBackTitleStyle: {
        //   color: 'red'
        // }
      }
    }
  },
  Appointment: {
    screen: AppointmentDetail,
    navigationOptions: {
      title: 'Wizyta',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  AppointmentEdit: {
    screen: AppointmentEdit,
    navigationOptions: {
      title: 'Edytowanie wizyty',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  },
  Reports: {
    screen: ReportScreen,
    navigationOptions: {
      title: 'Raport',
      headerStyle: {
        backgroundColor: headerBackgroundColor,
      },
    }
  }
},
  {
    initialRouteName: 'AppointmentCalendar',
  })


const App = createAppContainer(navigator);

export default () => {
  return <ReportProvider>
    <AppointmentProvider>
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
  </ReportProvider>
};