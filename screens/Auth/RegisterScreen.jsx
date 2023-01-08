import { Button, Text, View } from "react-native";
import React from "react";

const RegisterScreen = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Register Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login Screen")}
      />
    </View>
  );
};

export default RegisterScreen;
