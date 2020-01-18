import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Dev Finder'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Dev Profile'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#7d40e7'
            }
        }
    })
);

export default Routes;