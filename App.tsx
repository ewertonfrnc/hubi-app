import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { reactPaperTheme } from "./src/utils/theme";

import { AuthProvider } from "./src/features/auth/contexts/auth.context";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <PaperProvider theme={reactPaperTheme}>
        {/* Contexts */}
        <AuthProvider>
          <Navigation />
        </AuthProvider>
        {/* Contexts */}
      </PaperProvider>

      <StatusBar style="inverted" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});
