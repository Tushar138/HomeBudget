/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';
import BudgetEntryScreen from './components/BudgetEntryScreen';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setInitialBudgetEntries } from './redux/action';
import { Budget } from './models/Budget';
import BudgetEntriesListingScreen from './components/BudgetEntriesListingScreen';






function App(): JSX.Element {
  const Stack=createNativeStackNavigator();
  const dispatch=useDispatch();
  const fetchBudgetEntries=async ()=>{
    const storedEntries = await AsyncStorage.getItem('budgetEntries');
    let entries:Budget[]=[]
    if (storedEntries !== null) {
      entries= JSON.parse(storedEntries);
    }
    dispatch(setInitialBudgetEntries(entries))
  }
  useEffect(()=>{
      fetchBudgetEntries();
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="BudgetEntryScreen"
        component={BudgetEntryScreen}
        options={{
          title: 'Budget Entry',
          headerStyle: {
            backgroundColor: 'thistle',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '700',
            fontFamily: 'lucida grande',
          },
        }}

        />
        <Stack.Screen
              name="BudgetEntriesListingScreen"
              component={BudgetEntriesListingScreen}
              options={{
                title: 'Budget Entry Listing',
                headerStyle: {
                  backgroundColor: 'thistle',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 30,
                  fontWeight: '700',
                  fontFamily: 'lucida grande',
                },
              }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
