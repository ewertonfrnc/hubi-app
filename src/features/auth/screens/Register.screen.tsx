import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../../utils/theme";
import { Button, Card, Divider, TextInput } from "react-native-paper";
import { UserPayload } from "../types/user.types";
import { registerUser } from "../data";

const defaultFormValues = {
  name: "",
  email: "",
  username: "",
  password: "",
};

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<UserPayload>(defaultFormValues);

  async function handleSubmit() {
    console.log(formValues);
    setLoading(true);

    try {
      await registerUser(formValues);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const source = {
    uri: "https://shorturl.at/5usX6",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.image}
        blurRadius={3}
      />

      <View style={styles.cardContainer}>
        <Card>
          <Card.Title title="Criar conta" />

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
              Criar conta
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
