import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackRoutes = () => (
    <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{
            header: () => <View />,
            headerShown: false

        }}
        >
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
);

export const Routes: React.FC = () => {
    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    );
}