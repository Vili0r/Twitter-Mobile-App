import React, { useState, useEffect, useRef, useContext } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import axiosConfig from "../helpers/axiosConfig";
import TweetDetails from "./TweetDetails";
import { AuthContext } from "../context/AuthProvider";

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isAtEndOfScrolling, setIsAtEndOfScrolling] = useState(false);
  const flatListRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      getAllTweetsRefresh();
      flatListRef.current.scrollToOffset({
        offset: 0,
      });
    }
  }, [route.params?.newTweetAdded]);

  const getAllTweetsRefresh = () => {
    setPage(1);
    setIsRefreshing(false);
    setIsAtEndOfScrolling(false);

    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;

    axiosConfig
      .get(`/tweets`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const getAllTweets = () => {
    axiosConfig.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.token}`;

    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((res) => {
        if (page === 1) {
          setData(res.data.data);
        } else {
          setData([...data, ...res.data.data]);
        }

        if (!res.data.next_page_url) {
          setIsAtEndOfScrolling(true);
        }
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  const handleRefresh = () => {
    setPage(1);
    setIsAtEndOfScrolling(false);
    setIsRefreshing(true);
    getAllTweets();
  };

  const handleEnd = () => {
    setPage(page + 1);
  };

  return (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <ActivityIndicator className="mt-2" size="large" color="gray" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={(props) => <TweetDetails {...props} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View className="border-gray-200 border-b"></View>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEnd}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtEndOfScrolling && (
              <ActivityIndicator size="large" color="gray" />
            )
          }
        />
      )}
      <TouchableOpacity
        className="absolute right-2 bottom-2 h-12 w-12 rounded-full justify-center items-center bg-blue-500"
        onPress={() => navigation.navigate("New Tweet")}
      >
        <AntDesign name="plus" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}
