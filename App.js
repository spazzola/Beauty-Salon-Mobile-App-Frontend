import React, {Image, Text} from 'react';
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

const navigator = createStackNavigator({


  Clients: {
    screen: ClientScreen,
    navigationOptions: {
      title: 'Klienci',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  Client: {
    screen: ClientDetail,
    navigationOptions: {
      title: 'Klient',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  ClientAdd: {
    screen: ClientAdd,
    navigationOptions: {
      title: 'Dodawanie klienta',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  ClientEdit: {
    screen: ClientEdit,
    navigationOptions: {
      title: 'Edytowanie klienta',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },

  Users: {
    screen: UserScreen,
    navigationOptions: {
      title: 'Personel',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  User: {
    screen: UserDetail,
    navigationOptions: {
      title: 'Pracownik',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  UserAdd: {
    screen: UserAdd,
    navigationOptions: {
      title: 'Dodawanie pracownika',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  UserEdit: {
    screen: UserEdit,
    navigationOptions: {
      title: 'Edytowanie pracownika',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },

  Costs: {
    screen: CostScreen,
    navigationOptions: {
      title: 'Koszty',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  CostDetail: {
    screen: CostDetail,
    navigationOptions: {
      title: 'Koszt',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  CostAdd: {
    screen: CostAdd,
    navigationOptions: {
      title: 'Dodawanie kosztu',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  CostEdit: {
    screen: CostEdit,
    navigationOptions: {
      title: 'Edycja kosztu',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },

  Solarium: {
    screen: SolariumScreen,
    navigationOptions: {
      title: 'Solarium',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },

  Works: {
    screen: WorkScreen,
    navigationOptions: {
      title: 'Usługi',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  Work: {
    screen: WorkDetail,
    navigationOptions: {
      title: 'Usługa',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  WorkAdd: {
    screen: WorkAdd,
    navigationOptions: {
      title: 'Dodawanie usługi',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },
  WorkEdit: {
    screen: WorkEdit,
    navigationOptions: {
      title: 'Edytowanie usługi',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  },

  AppointmentCalendar: {
    screen: AppointmentCalendar,
    navigationOptions: {
      title: 'Kalendarz',
      headerStyle: {
        backgroundColor: '#FF00E4',
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
        backgroundColor: '#FF00E4',
      },
    }
  },
  AppointmentAdd: {
    screen: AppointmentAdd,
    navigationOptions: {
      title: 'Dodawanie wizyty',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
      options: {
        headerBackTitleStyle: {
          color: 'red'
        },
        headerBackImage: () => {<Image source={'./src/icons/button_icons/back_button-1.png'} style={{width: 50, height: 50}}/>}
      }
    }
  },
  Appointment: {
    screen: AppointmentDetail,
    navigationOptions: {
      title: 'Wizyta',
      headerStyle: {
        backgroundColor: '#FF00E4',
      },
    }
  }
},
  {
    initialRouteName: 'AppointmentCalendar',
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