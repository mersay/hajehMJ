
import React from 'react'
import {createStackNavigator} from 'react-navigation'

import HomeScreen from './Screens/HomeScreen'
import RulesScreen from './Screens/RulesScreen'
import TransactionsScreen from './Screens/TransactionsScreen'
import Step0Screen from './Screens/Step0Screen'
import Step1Screen from './Screens/Step1Screen'
import Step2aScreen from './Screens/Step2aScreen'
import Step2bScreen from './Screens/Step2bScreen'
import Step3aScreen from './Screens/Step3aScreen'
import Step3bScreen from './Screens/Step3bScreen'
import AboutScreen from './Screens/AboutScreen'
import RecordScreen from './Screens/RecordScreen'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Rules: RulesScreen,
    Transactions: TransactionsScreen,
    Step0: Step0Screen,
    Step1: Step1Screen,
    Step2a: Step2aScreen,
    Step2b: Step2bScreen,
    Step3a: Step3aScreen,
    Step3b: Step3bScreen,
    About: AboutScreen,
    Record: RecordScreen,
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}