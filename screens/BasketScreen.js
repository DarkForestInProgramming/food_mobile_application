import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#DC4C64] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">
              Prekių krepšelis
            </Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#DC4C64" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-9 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Pristatyti per 30-45 min</Text>
          <TouchableOpacity>
            <Text className="text-[#DC4C64]">Pakeisti</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#DC4C64]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />

              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                <Text>{euro.format(items[0]?.price)}</Text>
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#DC4C64] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Pašalinti
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Bendrai</Text>
            <Text className="text-gray-400">{euro.format(basketTotal)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Pristatymo mokestis</Text>
            <Text className="text-gray-400">{euro.format(1.99)}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Bendra suma</Text>
            <Text className="font-extrabold">
              {euro.format(basketTotal + 1.99)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#DC4C64] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Užsakyti
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
