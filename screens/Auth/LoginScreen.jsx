import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login screen</Text>
      <TextInput
        className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="gray"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="gray"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TouchableOpacity
        className="bg-blue-500 py-2 px-3 mt-2 rounded-full"
        onPress={() => login(email, password)}
      >
        <Text className="text-white font-bold">Follow</Text>
      </TouchableOpacity>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register Screen")}
      />
    </View>
  );
};

export default LoginScreen;
