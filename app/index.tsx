import {StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={style.container}
    >
      
      <Text>  oi</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
  }
})