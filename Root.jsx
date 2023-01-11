import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigations/DrawerNavigator";
import { AuthContext } from "./context/AuthProvider";
import { View, ActivityIndicator } from "react-native";
import AuthStackNavigator from "./navigations/AuthStackNavigator";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    //check if user is logged in
    //Check securestore for the user object/token
    SecureStore.getItemAsync("user")
      .then((userString) => {
        if (userString) {
          setUser(JSON.parse(userString));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <>
      {user ? (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackNavigator />
        </NavigationContainer>
      )}
    </>
  );
}
