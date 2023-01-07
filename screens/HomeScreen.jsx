import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home Screen / Feed</Text>
      <Button
        title="New Tweet"
        onPress={() => navigation.navigate("New Tweet")}
      />
      <Button
        title="Tweet Screen"
        onPress={() => navigation.navigate("Tweet Screen")}
      />
      <Button
        title="Profile Screen"
        onPress={() => navigation.navigate("Profile Screen")}
      />
    </View>
  );
}
