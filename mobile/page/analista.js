import React from "react";
import { StyleSheet, Text, View } from "react-native";

import registerPage from "./decorator";

function Analista({ navigation }) {
  const user = navigation.getParam("username");
  return (
    <View style={styles.container}>
      <Text> Bem Vindo! {user} </Text>
      <Text> conteúdo do analista </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Analista };

export default registerPage({
  name: "analista",
  label: "Analista",
})(Analista);
