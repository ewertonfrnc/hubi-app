import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Divider, TextInput } from "react-native-paper";

import { theme } from "../../../utils/theme";
import { LoginPayload } from "../types/user.types";

import { loginUser } from "../data";

const defaultFormValues = {
  email: "",
  password: "",
};

type Props = { navigateBack: () => void };
export default function Login({ navigateBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<LoginPayload>(defaultFormValues);

  async function handleSubmit() {
    setLoading(true);

    try {
      await loginUser(formValues);
      navigateBack();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <Card>
      <Card.Title title="Entre na sua conta" />

      <Divider />

      <Card.Content>
        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="outlined"
            inputMode="email"
            value={formValues.email}
            placeholder="Insira seu email"
            onChangeText={(email) => setFormValues({ ...formValues, email })}
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
  );
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: theme.spaces.md,
    gap: theme.spaces.sm,
  },
});
