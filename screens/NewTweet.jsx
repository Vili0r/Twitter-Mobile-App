import React, { useState } from "react";
import { Text, View, Image, ActivityIndicator, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import axiosConfig from "../helpers/axiosConfig";

export default function NewTweet({ navigation }) {
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendTweet = () => {
    if (tweet.length === 0) {
      Alert.alert("Please enter a tweet");
      return;
    }

    setIsLoading(true);

    axiosConfig
      .post(`tweets`, {
        body: tweet,
      })
      .then((res) => {
        navigation.navigate("Home2", {
          newTweetAdded: res.data,
        });
        setIsLoading(false);
        setTweet("");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex flex-row justify-between p-2 bg-white">
        <Text className={tweet.length > 250 ? "text-red-600" : "text-gray-500"}>
          Characters left: {280 - tweet.length}
        </Text>
        <View className="flex flex-row">
          {isLoading && (
            <ActivityIndicator className="mr-2" size="small" color="gray" />
          )}
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-full"
            onPress={() => sendTweet()}
            disabled={isLoading}
          >
            <Text className="text-white font-bold">Tweet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row p-3">
        <Image
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white mr-2"
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        />
        <TextInput
          onChangeText={setTweet}
          value={tweet}
          placeholder="What's happening?"
          placeholderTextColor="gray"
          multiline
          maxLength={280}
          className="flex-1"
        />
      </View>
    </View>
  );
}
