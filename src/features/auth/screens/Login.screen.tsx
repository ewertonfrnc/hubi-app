import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../../utils/theme";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";
import { LoginPayload } from "../types/user.types";
import { loginUser } from "../data";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountNavigatorParamList } from "../../../navigation/types/RootStack.types";

const defaultFormValues = {
  email: "",
  password: "",
};

type Props = {} & StackScreenProps<AccountNavigatorParamList>;

export default function LoginScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<LoginPayload>(defaultFormValues);

  function navigateToRegister() {
    navigation.navigate("Register");
  }

  async function handleSubmit() {
    console.log(formValues);
    setLoading(true);

    try {
      await loginUser(formValues);
      // navigation.navigate('')
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const source = { uri: "https://shorturl.at/5usX6" };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.image}
        blurRadius={3}
      />

      <View style={styles.cardContainer}>
        <View>
          <Text>Que tal criar uma conta?</Text>
          <Pressable onPress={navigateToRegister}>
            <Text>Criar conta</Text>
          </Pressable>
        </View>

        <Card>
          <Card.Title title="Entrar na sua conta" />

          <Divider />

          <Card.Content>
            <View style={styles.form}>
              <TextInput
                label="Email"
                mode="outlined"
                inputMode="email"
                value={formValues.email}
                placeholder="Insira seu email"
                onChangeText={(email) =>
                  setFormValues({ ...formValues, email })
                }
              />

              <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry
                value={formValues.password}
                placeholder="Insira sua senha"
                onChangeText={(password) =>
                  setFormValues({ ...formValues, password })
                }
              />
            </View>
          </Card.Content>

          <Divider />

          <Card.Actions>
            <Button
              mode="contained-tonal"
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
            >
              Entrar
            </Button>
          </Card.Actions>
        </Card>
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
    flex: 0.8,
    justifyContent: "center",
    padding: theme.spaces.md,
  },
  form: {
    paddingVertical: theme.spaces.md,
    gap: theme.spaces.sm,
  },
});
