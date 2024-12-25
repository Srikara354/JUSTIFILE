// HomeNav.tsx

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsScreen from '../(tabs)/index'; // Ensure the path is correct
import ReadNews from '../(tabs)/ReadNews';

const Stack = createStackNavigator<RootStackParamList>();

function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={NewsScreen} />
      <Stack.Screen name="ReadNews" component={ReadNews} />
    </Stack.Navigator>
  );
}

export type RootStackParamList = {
  Home: undefined;
  ReadNews: { news: any }; // Expect a parameter `news` which is of type any
};

export default HomeNav;
