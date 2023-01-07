import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NewTweet, TweetScreen, ProfileScreen } from "../screens";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="New Tweet"
        component={NewTweet}
        options={{
          title: " ",
        }}
      />
      <Stack.Screen
        name="Tweet Screen"
        component={TweetScreen}
        options={{
          title: " ",
        }}
      />
      <Stack.Screen
        name="Profile Screen"
        component={ProfileScreen}
        options={{
          title: " ",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
