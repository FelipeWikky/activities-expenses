import { FontAwesome } from '@expo/vector-icons';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View, ColorSchemeName, Pressable } from 'react-native';
import { Icon } from '../components/Icon';
import { useTranslation } from '../contexts/translation/useTranslation';

import { Home } from '../screens/Home';
import { Main } from '../screens/Main';
import { Settings } from '../screens/Settings';
import { Diary } from '../screens/Diary';
import { Dashboard } from '../screens/Dashboard';
import { THEME } from '../theme';

import LinkingConfiguration from './LinkingConfigurations';
import { RootTabParamList, RootTabScreenProps } from './types';

const Stack = createNativeStackNavigator();

const StackRoutes = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            header: () => <View />,
            headerShown: false,
        }}
    >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={BottomTabRoutes} />
    </Stack.Navigator>
);

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const BottomTabRoutes = () => {
    const { t } = useTranslation();
    return (
        <BottomTab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarActiveTintColor: THEME.COLORS.LABEL,
                tabBarInactiveTintColor: THEME.COLORS.TEXT,
                // unmountOnBlur: true
            }}
        >
            <BottomTab.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ navigation }: RootTabScreenProps<'List'>) => ({
                    header: () => <View />,
                    headerShown: false,
                    title: t("label.dashboard"),
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({ color }) =>
                        <Icon group='FontAwesome' name="dashboard" customColor={color} size={25} />,
                })}
            />
            <BottomTab.Screen
                name='List'
                component={Main}
                options={({ navigation }: RootTabScreenProps<'List'>) => ({
                    header: () => <View />,
                    headerShown: false,
                    title: t("label.list"),
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({ color }) =>
                        <Icon group='FontAwesome' name="list" customColor={color} size={25} />,
                })}
            />

            <BottomTab.Screen
                name='Diary'
                component={Diary}
                options={({ navigation }: RootTabScreenProps<'Diary'>) => ({
                    header: () => <View />,
                    headerShown: false,
                    title: t("label.diary"),
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({ color }) =>
                        <Icon group='FontAwesome' name="calendar" customColor={color} size={25} />,
                })}
            />

            <BottomTab.Screen
                name='Settings'
                component={Settings}
                options={({ navigation }: RootTabScreenProps<'Settings'>) => ({
                    header: () => <View />,
                    headerShown: false,
                    title: t("label.settings"),
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({ color }) =>
                        <Icon group='Ionicons' name="ios-settings-sharp" customColor={color} size={25} />,
                    // headerRight: () => (
                    //     <Pressable
                    //         onPress={() => navigation.navigate('Main')}
                    //         style={({ pressed }) => ({
                    //             opacity: pressed ? 0.5 : 1,
                    //         })}>
                    //         <FontAwesome
                    //             name="info-circle"
                    //             size={25}
                    //             color={THEME.COLORS.LABEL}
                    //             style={{ marginRight: 15 }}
                    //         />
                    //     </Pressable>
                    // ),

                })}
            />

        </BottomTab.Navigator>
    );
}


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


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
