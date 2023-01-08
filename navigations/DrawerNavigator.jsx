import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { NewTweet, SettingsScreen } from "../screens";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="New Tweet" component={NewTweet} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
