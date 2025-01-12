import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Appbar,
  Portal,
  Text,
  Modal,
  Button,
  Divider,
  TextInput,
} from "react-native-paper";

import { theme } from "../../../utils/theme";
import { AuthContext } from "../../auth/contexts/auth.context";
import { Movie, MovieReviewPayload } from "../../explore/types/Movies.types";

import { registerNewReview } from "../data/registerNewReview";

import DetailsHeader from "./DetailsHeader";

type Props = {
  movie: Movie;
  navigateToAuthScreen: () => void;
};

export default function Details({ movie, navigateToAuthScreen }: Props) {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser);

  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  function authController() {
    if (!currentUser) setRegisterModalVisible(true);
  }

  function handleAuthNavigation() {
    navigateToAuthScreen();
    setRegisterModalVisible(false);
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  async function saveMovieReview() {
    const payload: MovieReviewPayload = {
      userId: "8e8d8b58-2e07-4037-93e1-7f73c414bef9",
      movieId: movie.id,
      spoilers: false,
      review: comment,
    };

    setLoading(true);

    try {
      const movieReview = await registerNewReview(payload);
      console.log({ movieReview });

      hideModal();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <DetailsHeader movie={movie} />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.modalHeading}>
            <Text variant="titleMedium" style={styles.modalTitle}>
              💬 Novo comentário
            </Text>
          </View>

          <Divider />

          <TextInput
            multiline
            mode="outlined"
            value={comment}
            numberOfLines={4}
            style={{ height: 140 }}
            onChangeText={(text) => setComment(text)}
          />

          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={saveMovieReview}
          >
            Comentar
          </Button>
        </Modal>

        <Modal
          visible={registerModalVisible}
          onDismiss={() => setRegisterModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleMedium" style={styles.modalTitle}>
            Crie ou acesse sua conta
          </Text>
          <Text>Você precisa estar logado para continuar.</Text>

          <View style={styles.loginBtns}>
            <Button mode="outlined" onPress={handleAuthNavigation}>
              Entrar
            </Button>
            <Button mode="contained-tonal" onPress={handleAuthNavigation}>
              Criar conta
            </Button>
          </View>
        </Modal>
      </Portal>

      <Appbar style={styles.bottom}>
        <Appbar.Action icon="star-plus" onPress={authController} />
        <Appbar.Action icon="chat-plus" onPress={authController} />
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: theme.COLORS.ui.dark,
    borderRadius: theme.sizes.xsm,
    padding: theme.spaces.md,
    margin: theme.spaces.lg,
    gap: theme.spaces.md,
  },
  modalHeading: {},
  modalTitle: {
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  loginBtns: {
    flexDirection: "row",
    gap: theme.spaces.md,
  },
});
