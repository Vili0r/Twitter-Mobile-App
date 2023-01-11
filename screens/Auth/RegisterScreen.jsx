import { ActivityIndicator, Text, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axiosConfig from "../../helpers/axiosConfig";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = (email, username, password, confirmPassword) => {
    if (name.length < 1) {
      Alert.alert("Please enter a name");
    }
    setIsLoading(true);

    axiosConfig
      .post("register", {
        name,
        email,
        username,
        password,
        password_confirmation: confirmPassword,
      })
      .then((response) => {
        Alert.alert("User creatre! Please login.");
        navigation.navigate("Login Screen");

        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error.response);
        const key = Object.keys(error.response.data.errors)[0];
        setError(error.response.data.errors[key][0]);
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 items-center bg-blue-400">
      <View className="mt-4 w-[260]">
        <View className="items-center mt-16">
          <Image
            className="h-[120] w-[100]"
            source={require("../../assets/larydefault.png")}
          ></Image>
        </View>
        {error && <Text className="text-sm text-red-500">{error}</Text>}
        <View>
          <TextInput
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            onChangeText={setName}
            value={name}
            placeholder="Name"
            placeholderTextColor="gray"
            autoCapitalize="none"
          />
          <TextInput
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="gray"
            autoCapitalize="none"
          />
          <TextInput
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          className="bg-blue-500 justify-center flex flex-row py-2 px-3 mt-2 mb-2 rounded-full"
          onPress={() => register(email, username, password, confirmPassword)}
        >
          {isLoading && (
            <ActivityIndicator className="mr-2" size="small" color="white" />
          )}
          <Text className="text-white text-center font-bold">Register</Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-center">
          <Text className="text-sm mr-2">Do you have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login Screen")}>
            <Text className="text-white underline">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
