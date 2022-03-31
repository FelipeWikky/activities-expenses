import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, ColorSchemeName, Pressable } from 'react-native';

import Home from '../screens/Home';
import Main from '../screens/Main';

import LinkingConfiguration from './LinkingConfigurations';

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
        <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
);

type RouteProps = {
    colorScheme: ColorSchemeName
}

export const Routes: React.FC<RouteProps> = ({ colorScheme }) => {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <StackRoutes />
        </NavigationContainer>
    );
}