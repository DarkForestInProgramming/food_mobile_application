import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  let euro = Intl.NumberFormat("en-DE", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-5 bg-[#DC4C64] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#000000] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          Atverti krepšelį
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Text>{euro.format(basketTotal)}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
