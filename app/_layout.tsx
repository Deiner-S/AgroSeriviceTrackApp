// navigation/StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CheckList from './checklist';
import Index from './index';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Index} />
      <Stack.Screen name="Check list" component={CheckList} />
    </Stack.Navigator>
  );
}
