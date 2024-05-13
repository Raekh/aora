import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
  Alert,
} from "react-native";

import { images } from "../../constants";
import { EmptyState, SearchInput, Trending } from "../../components";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../lib/appwrite";

const Home = (params) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllPosts();
        setData(response.data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    // call videos fetch
    setRefreshing(false);
  };

  console.log({ data });

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" />
              </View>
            </View>

            <SearchInput
              title={""}
              value={""}
              placeholder="Search for a video topic"
              handleChangeText={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
              otherStyles={""}
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl=<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      />
    </SafeAreaView>
  );
};

export default Home;
