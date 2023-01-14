import React, { useState, useEffect, useRef, useContext } from "react";
import { Text, View, Image, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axiosConfig from "../helpers/axiosConfig";
import { format } from "date-fns";
import { Modalize } from "react-native-modalize";
import { AuthContext } from "../context/AuthProvider";

export default function TweetScreen({ route, navigation }) {
  const [tweet, setTweet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalizeRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getTweet();
  }, []);

  const getTweet = () => {
    axiosConfig
      .get(`tweets/${route.params.tweetId}`)
      .then((res) => {
        setTweet(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteTweet = () => {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loggedUser.token}`;

    axiosConfig
      .delete(`tweets/${route.params.tweetId}`)
      .then((res) => {
        Alert.alert("Tweet deleted successfully!");
        navigation.navigate("Home2", {
          tweetDeleted: true,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showAlert = () => {
    Alert.alert("Delete Tweet?", null, [
      {
        text: "Cancel",
        onPress: () => modalizeRef.current?.close(),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deleteTweet(),
        style: "default",
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <ActivityIndicator className="mt-2" size="large" color="gray" />
      ) : (
        <>
          <View className="flex flex-row px-4 py-2 justify-between">
            <View className="flex flex-row">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile Screen", {
                    userId: tweet.user.id,
                  })
                }
              >
                <Image
                  className="inline-block h-12 w-12 rounded-full ring-2 ring-white mr-2"
                  source={{ uri: tweet.user.avatar }}
                />
              </TouchableOpacity>
              <View
                className=""
                onPress={() => navigation.navigate("Profile Screen")}
              >
                <Text numberOfLines={1} className="font-bold">
                  {tweet.user.name}
                </Text>
                <Text numberOfLines={1} className="text-sm text-gray-500">
                  @{tweet.user.username}
                </Text>
              </View>
            </View>
            {user.id === tweet.user.id && (
              <TouchableOpacity
                className="justify-item-end"
                onPress={() => modalizeRef.current?.open()}
              >
                <Entypo name="dots-three-vertical" size={16} color="grey" />
              </TouchableOpacity>
            )}
          </View>
          <View className="border-b border-gray-200">
            <Text className="p-2 leading-6">{tweet.body}</Text>
            <View className="flex flex-row mb-3 px-2 gap-2">
              <Text className="text-xs text-gray-500">
                {format(new Date(tweet.created_at), "h:mm a")}
              </Text>
              <Text>&middot;</Text>
              <Text className="text-xs text-gray-500">
                {format(new Date(tweet.created_at), "d MMM.yy")}
              </Text>
              <Text>&middot;</Text>
              <Text className="text-xs text-blue-400">Twitter for iPhone</Text>
            </View>
          </View>
          <View className="flex flex-row items-center p-3 border-b border-gray-200">
            <TouchableOpacity className="flex-row mr-3">
              <Text className="font-bold">9</Text>
              <Text className="text-gray-500 ml-1">Retweets</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row mr-3">
              <Text className="font-bold">456</Text>
              <Text className="text-gray-500 ml-1">Quote Tweets</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row mr-3">
              <Text className="font-bold">1,456</Text>
              <Text className="text-gray-500 ml-1">Likes</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-around items-center p-3 border-b border-gray-200">
            <TouchableOpacity className="flex-row mr-3">
              <EvilIcons name="comment" size={30} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row mr-3">
              <EvilIcons name="retweet" size={30} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row mr-3">
              <EvilIcons name="heart" size={30} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row">
              <EvilIcons
                name={Platform.OS === "ios" ? "share-apple" : "share-google"}
                size={30}
                color="grey"
              />
            </TouchableOpacity>
          </View>

          <Modalize ref={modalizeRef} snapPoint={200}>
            <View className="p-3">
              <TouchableOpacity className="flex flex-row items-center mb-6 gap-2">
                <AntDesign name="pushpino" size={24} color="#222" />
                <Text className="font-semibold">Pin Tweet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showAlert}
                className="flex flex-row items-center gap-2"
              >
                <AntDesign name="delete" size={24} color="#222" />
                <Text className="font-semibold">Delete Tweet</Text>
              </TouchableOpacity>
            </View>
          </Modalize>
        </>
      )}
    </View>
  );
}
