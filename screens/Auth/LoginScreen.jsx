import { ActivityIndicator, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useContext(AuthContext);

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
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor="gray"
            textContentType="emailAddress"
            keyboardType="email-address"
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
        </View>
        <TouchableOpacity
          className="bg-blue-500 justify-center flex flex-row py-2 px-3 mt-2 mb-2 rounded-full"
          onPress={() => login(email, password)}
        >
          {isLoading && (
            <ActivityIndicator className="mr-2" size="small" color="white" />
          )}
          <Text className="text-white text-center font-bold">Login</Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-center">
          <Text className="text-sm mr-2">Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register Screen")}
          >
            <Text className="text-white underline">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
