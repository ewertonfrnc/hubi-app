import { useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";

import { theme } from "../../../utils/theme";

import Login from "../components/Login";
import Register from "../components/Register";
import { StackScreenProps } from "@react-navigation/stack";
import {
  AccountNavigatorParamList,
  RootStackParamList,
} from "../../../navigation/types/RootStack.types";

type Props = StackScreenProps<AccountNavigatorParamList>;

export default function AuthScreen({ navigation }: Props) {
  const [authOption, setAuthOption] = useState<"login" | "register">("login");

  function handleAuthOption() {
    if (authOption === "login") setAuthOption("register");
    if (authOption === "register") setAuthOption("login");
  }

  function navigateBack() {
    navigation.navigate("Login");
  }

  const source = {
    uri: "https://images.unsplash.com/photo-1561905199-e7adfe8aa7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.image}
        blurRadius={1}
      />

      <View style={styles.cardContainer}>
        {authOption === "login" ? (
          <View>
            <View style={{ alignItems: "flex-start" }}>
              <Text>Ainda não tem uma conta?</Text>
              <Button mode="text" onPress={handleAuthOption}>
                Criar conta
              </Button>
            </View>

            <Login navigateBack={navigateBack} />
          </View>
        ) : (
          <View>
            <View style={{ alignItems: "flex-start" }}>
              <Text>Já possui uma conta?</Text>
              <Button mode="text" onPress={handleAuthOption}>
                Entrar
              </Button>
            </View>

            <Register navigateBack={navigateBack} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spaces.md,
  },
});
