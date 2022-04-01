/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

 import { BottomTabScreenProps as BottomTabScreenPropsNavigation } from '@react-navigation/bottom-tabs';
 import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
 import { NativeStackScreenProps } from '@react-navigation/native-stack';
 
 declare global {
   namespace ReactNavigation {
     interface RootParamList extends RootStackParamList {}
   }
 }
 
 export type RootStackParamList = {
   Home: undefined;
   Main: undefined;
   NotFound: undefined;
 };
 
 export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
   RootStackParamList,
   Screen
 >;

 export type BottomTabParamsList = {
   List: undefined;
   Settings: undefined;
   Diary: undefined;
 }

 export type RootTabParamList = {
   List: undefined;
   Settings: undefined;
   Diary: undefined;
 }

export type BottomTabScreenProps<Screen extends keyof BottomTabParamsList> = CompositeScreenProps<
BottomTabScreenPropsNavigation<BottomTabParamsList, Screen>,
NativeStackScreenProps<RootStackParamList>
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
BottomTabScreenPropsNavigation<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
