import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ProfileScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ThemedText type="title">Profile</ThemedText>
      <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
        User profile will be displayed here.
      </ThemedText>
    </ThemedView>
  );
}
