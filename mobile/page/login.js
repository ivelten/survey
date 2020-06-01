import React, { useState } from "react";
import { View, Button, ButtonText } from "react-native";

import Text from "../component/text";
import BoxInput from "../component/boxInput";
import Input from "../component/input";

import texts from "../const/texts";

import registerPage from "./decorator";


/*

// usuário existe
// exemplo: /login
const data1_Test = {
    status:true,
    msg:'token',
    id:123,
}

// exemplo: /users/aurelio 
const data2_Test = {
    perfil:'analista' | 'cliente' | 'admin',
    emal:'aurelio.gualda@gmail.com'
}

*/

function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPass] = useState("");

  return (
    <View>
      <Text>{texts.pages.login.pt.title}</Text>
      <View>
        <BoxInput>
          <Text>{texts.pages.login.pt.user} : </Text>
          <Input onChangeText={(text) => setUser(text)} value={user} />
        </BoxInput>
        <BoxInput>
          <Text>{texts.pages.login.pt.pass} : </Text>
          <Input onChangeText={(text) => setPass(text)} value={password} />
        </BoxInput>
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate("analista", {username:"aurelio"});
          }}
          title="ANALSITA"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

export { Login };

export default registerPage({
  name: "login",
  label: "Login",
})(Login);
