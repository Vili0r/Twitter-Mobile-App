import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Settings Screen</Text>
      <TouchableOpacity
        className="bg-gray-500 py-2 px-3 mt-2 rounded-full"
        onPress={() => logout()}
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
