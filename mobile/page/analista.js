import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import registerPage from "./decorator";


// usuer/analista/aurelio

/*

const data_1_TEST  = {

  forms:[
      'formulario 1',
      'formulario 2',
      'formulario 3',
      'covid19'
  ]
}


// usuer/analista/report/covid19


const data_1_TEST  = {

  form:{
      name: 'covid19',
       perguntas:[
          {
            descricao:' vocÊ está  ficando em casa quantas horas por dia?',
            respostas:[
              {
                nome: 'a',
                descricao: '8 horas por dia'
              },
              {
                nome: 'b',
                descricao: '23:30 min horas por dia'
              }
            ]
          }
       ]
  }
}
*/

function Analista({ navigation }) {
  const user = navigation.getParam("username");
  return (
    <View style={styles.container}>
      <View>
        <Text> Bem vindo, analista {user} </Text>
      </View>

      <View>
        <Text> Report </Text>

        <FlatList
          data={[{ key: "Covid-19" }]}
          renderItem={({ item }) => (
            <Text style={styles.item}>* {item.key}</Text>
          )}
        />
      </View>
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


