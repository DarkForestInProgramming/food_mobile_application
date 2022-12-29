import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#711716] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/food_loading_screen.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-xl my-10 text-white font-bold text-center"
      >
        Laukiama kol restoranas priims Jūsų užsakymą!
      </Animatable.Text>

      <Progress.Circle size={60} inderminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
