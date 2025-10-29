import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function SearchScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ThemedText type="title">Search</ThemedText>
      <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
        Search functionality will be implemented here.
      </ThemedText>
    </ThemedView>
  );
}
