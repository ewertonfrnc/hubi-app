import { useContext, useState } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { Button, Card, Divider, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { registerUser } from "../data";
import { theme } from "../../../utils/theme";
import { AuthContext } from "../contexts/auth.context";
import type { UserPayload } from "../types/user.types";

export default function AuthScreen() {
  const { setCurrentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<UserPayload>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const source = {
    uri: "https://images.unsplash.com/photo-1561905199-e7adfe8aa7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  async function handleSubmit() {
    console.log(formValues);
    setLoading(true);

    try {
      const userInfo = await registerUser(formValues);
      setCurrentUser(userInfo);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.image}
        blurRadius={1}
      />
      <View style={styles.cardContainer}>
        <Card>
          <Card.Title title="Hubi" />

          <Divider />

          <Card.Content>
            <View style={styles.form}>
              <TextInput
                label="Usuário"
                mode="outlined"
                value={formValues.username}
                placeholder="Insira seu nome de usuário"
                onChangeText={(username) =>
                  setFormValues({ ...formValues, username })
                }
              />

              <TextInput
                label="Nome"
                mode="outlined"
                inputMode="text"
                value={formValues.name}
                placeholder="Insira seu nome"
                onChangeText={(name) => setFormValues({ ...formValues, name })}
              />

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
              Submit
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
    flex: 1,
    justifyContent: "center",
    padding: theme.spaces.md,
  },
  form: {
    paddingVertical: theme.spaces.md,
    gap: theme.spaces.sm,
  },
});
