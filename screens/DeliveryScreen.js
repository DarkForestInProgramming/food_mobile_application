import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { selectRestaurant } from "../features/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#DC4C64] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">
            Pagalba su užsakymu
          </Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">
                Numatomas pristatymo laikas
              </Text>
              <Text className="text-4xl font-bold">30-45 minutės</Text>
            </View>
            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#DC4C64" indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Jūsų užsakymas iš {restaurant.title} yra ruošiamas
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#DC4C64"
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Deividas Š.</Text>
          <Text className="text-gray-400">Jūsų pristatytojas</Text>
        </View>
        <Text className="text-[#DC4C64] text-lg mr-5 font-bold">Skambinti</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
