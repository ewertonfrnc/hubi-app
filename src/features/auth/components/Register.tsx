import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Divider, TextInput } from "react-native-paper";

import { theme } from "../../../utils/theme";
import { UserPayload } from "../types/user.types";

import { registerUser } from "../data";
import { AuthContext } from "../contexts/auth.context";

const defaultFormValues = {
  name: "",
  email: "",
  username: "",
  password: "",
};
type Props = { navigateBack: () => void };
export default function Register({ navigateBack }: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<UserPayload>(defaultFormValues);

  async function handleSubmit() {
    console.log(formValues);
    setLoading(true);

    try {
      await registerUser(formValues);
      navigateBack();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
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
          Criar conta
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
