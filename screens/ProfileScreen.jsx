import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axiosConfig from "../helpers/axiosConfig";
import { format } from "date-fns";
import TweetDetails from "./TweetDetails";
import { AuthContext } from "../context/AuthProvider";

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTweets, setIsLoadingTweets] = useState(true);
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const { user: loggedUser } = useContext(AuthContext);

  useEffect(() => {
    getUser();
    getUserTweets();
  }, [page]);

  useEffect(() => {
    getIsFollowing();
  }, []);

  const getUser = () => {
    axiosConfig
      .get(`users/${route.params.userId}`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const getUserTweets = () => {
    axiosConfig
      .get(`/users/${route.params.userId}/tweets?page=${page}`)
      .then((res) => {
        if (page === 1) {
          setData(res.data.data);
        } else {
          setData([...data, ...res.data.data]);
        }

        if (!res.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }
        setIsLoadingTweets(false);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoadingTweets(false);
        setIsRefreshing(false);
      });
  };

  const getIsFollowing = () => {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loggedUser.token}`;

    axiosConfig
      .get(`is_following/${route.params.userId}`)
      .then((res) => {
        setisFollowing(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const unFollow = () => {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loggedUser.token}`;

    axiosConfig
      .post(`unfollow/${route.params.userId}`)
      .then((res) => {
        setisFollowing(false);
        Alert.alert("You are now unfollowing this user.");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const follow = () => {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loggedUser.token}`;

    axiosConfig
      .post(`follow/${route.params.userId}`)
      .then((res) => {
        setisFollowing(true);
        Alert.alert("You are now following this user.");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const ProfileHeader = () => (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <ActivityIndicator className="mt-2" size="large" color="gray" />
      ) : (
        <>
          <Image
            className="w-full h-2/4"
            source={{
              uri: "https://loremflickr.com/g/320/240/paris",
            }}
          />
          <View className="flex flex-row justify-between px-2 items-end">
            <Image
              className="inline-block h-16 w-16 -mt-6 rounded-full ring-2 ring-white border-2 border-white mr-2"
              source={{ uri: user.avatar }}
            />
            {loggedUser.id !== route.params.userId && (
              <View>
                {!isFollowing ? (
                  <TouchableOpacity
                    className="bg-gray-700 py-2 px-3 rounded-full"
                    onPress={() => follow()}
                  >
                    <Text className="text-white font-bold">Follow</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-gray-700 py-2 px-3 rounded-full"
                    onPress={() => unFollow()}
                  >
                    <Text className="text-white font-bold">Unfollow</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          <View className="px-2">
            <Text className="font-bold text-xl">{user.name}</Text>
            <Text className="text-sm text-gray-500 -mt-1">
              @{user.username}
            </Text>
          </View>
          <View className="px-2">
            <Text className="font-semibold text-gray-500 text-md mt-3">
              {user.profile}
            </Text>
          </View>
          <View className="p-2 mt-2 flex flex-row">
            <EvilIcons name="location" size={24} color="black" />
            <Text className="text-sm text-gray-500">{user.location}</Text>
          </View>
          <View className="px-2 -mt-1 flex flex-row">
            <TouchableOpacity
              className="flex flex-row"
              onPress={() => Linking.openURL(user.link)}
            >
              <EvilIcons name="link" size={24} color="black" />
              <Text className="text-sm text-blue-500 mr-3">
                {user.linkText}
              </Text>
            </TouchableOpacity>
            <AntDesign name="calendar" size={18} color="black" />
            <Text className="text-sm text-gray-500 ml-1">
              Joined {format(new Date(user.created_at), "MMM yyy")}
            </Text>
          </View>
          <View className="px-3 mt-2 mb-3 flex flex-row">
            <Text className="font-bold">456</Text>
            <Text className="text-gray-500 ml-1 mr-3">Following</Text>
            <Text className="font-bold">456</Text>
            <Text className="text-gray-500 ml-1">Followers</Text>
          </View>
        </>
      )}
    </View>
  );

  const handleRefresh = () => {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getUserTweets();
  };

  const handleEnd = () => {
    setPage(page + 1);
  };

  return (
    <FlatList
      data={data}
      renderItem={(props) => <TweetDetails {...props} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View className="border-gray-200 border-b"></View>
      )}
      ListHeaderComponent={ProfileHeader}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEnd}
      onEndReachedThreshold={0}
      ListFooterComponent={() =>
        !isAtEndOfScrolling && <ActivityIndicator size="large" color="gray" />
      }
    />
  );
}
