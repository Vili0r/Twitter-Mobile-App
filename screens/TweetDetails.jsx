import React from "react";
import { Text, View, Image, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { formatDistanceToNowStrict } from "date-fns";
import { useNavigation } from "@react-navigation/native";

export default function TweetDetails({ item: tweet }) {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row p-4">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Profile Screen", { userId: tweet.user.id })
        }
      >
        <Image
          className="inline-block h-12 w-12 rounded-full ring-2 ring-white mr-2"
          source={{ uri: tweet.user.avatar }}
        />
      </TouchableOpacity>
      <View className="flex-1">
        <TouchableOpacity
          className="flex flex-row gap-2"
          onPress={() =>
            navigation.navigate("Tweet Screen", { tweetId: tweet.id })
          }
        >
          <Text numberOfLines={1} className="font-semibold">
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} className="text-xs text-gray-500">
            {tweet.user.username}
          </Text>
          <Text>&middot;</Text>
          <Text numberOfLines={1} className="text-xs text-gray-500">
            {formatDistanceToNowStrict(new Date(tweet.created_at))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-2"
          onPress={() =>
            navigation.navigate("Tweet Screen", { tweetId: tweet.id })
          }
        >
          <Text className="leading-5">{tweet.body}</Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center mt-3">
          <TouchableOpacity className="flex-row mr-3">
            <EvilIcons name="comment" size={22} color="grey" />
            <Text className="text-gray-500">9</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row mr-3">
            <EvilIcons name="retweet" size={22} color="grey" />
            <Text className="text-gray-500">456</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row mr-3">
            <EvilIcons name="heart" size={22} color="grey" />
            <Text className="text-gray-500">1,456</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row">
            <EvilIcons
              name={Platform.OS === "ios" ? "share-apple" : "share-google"}
              size={22}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
