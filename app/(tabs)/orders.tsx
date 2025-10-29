import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function OrdersScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <ThemedText type="title">Orders</ThemedText>
      <ThemedText style={{ marginTop: 20, textAlign: "center" }}>
        Your orders will be displayed here.
      </ThemedText>
    </ThemedView>
  );
}
