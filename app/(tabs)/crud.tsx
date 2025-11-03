import colors from "@/assets/colors";
import { fontFamily } from "@/assets/fonts";
import Typography from "@/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type Item = {
  id: string;
  title: string;
  category: string;
};

const CrudScreen = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("items")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const next: Item[] = snapshot.docs.map((doc) => {
            const data = doc.data() as { title?: string; category?: string };
            return {
              id: doc.id,
              title: data.title || "",
              category: data.category || "",
            };
          });
          setItems(next);
        },
        (error) => {
          console.error("Firebase fetch error:", error);
        }
      );
    return () => unsubscribe();
  }, []);

  const handleResetForm = () => {
    setEditingId(null);
    setNameInput("");
    setCategoryInput("");
  };

  const handleSave = async () => {
    const title = nameInput.trim();
    const category = categoryInput.trim();
    if (!title || !category) return;

    try {
      const col = firestore().collection("items");
      console.log("colcolcolcolcolcol", col);
      if (editingId) {
        await col.doc(editingId).update({ title, category });
        console.log("Item updated successfully");
      } else {
        await col.add({
          title,
          category,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert("Success", "Item added successfully");
      }
      handleResetForm();
    } catch (error) {
      console.error("Firebase save error:", error);
    }
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setNameInput(item.title);
    setCategoryInput(item.category);
  };

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id);
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete "${item?.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore().collection("items").doc(id).delete();
              console.log("Item deleted successfully");
              if (editingId === id) handleResetForm();
            } catch (error) {
              console.error("Firebase delete error:", error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel={`${item.title} card`}
      >
        <View style={styles.cardHeader}>
          <Typography size={16} family={fontFamily.semiBold}>
            {item.title}
          </Typography>
          <View
            style={styles.categoryPill}
            accessible
            accessibilityLabel={`Category ${item.category}`}
          >
            <Typography size={12} color={colors.LightRed}>
              {item.category}
            </Typography>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${item.title}`}
            onPress={() => handleEdit(item)}
          >
            <Ionicons name="create-outline" size={18} color={colors.black} />
            <Typography
              size={13}
              family={fontFamily.semiBold}
              style={styles.actionText}
            >
              Edit
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.title}`}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color={colors.white} />
            <Typography
              size={13}
              color={colors.white}
              family={fontFamily.semiBold}
              style={styles.actionText}
            >
              Delete
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Typography size={22} family={fontFamily.semiBold}>
          Menu Items
        </Typography>
        <Pressable
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel="Open actions"
          style={styles.headerIconBtn}
        >
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.black} />
        </Pressable>
      </View>

      {/** Search removed per request */}

      <View style={styles.listHeader}>
        <Typography color={colors.DarkRed} family={fontFamily.semiBold}>
          Showing {items.length} items
        </Typography>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <Pressable
        onPress={() => handleResetForm()}
        accessibilityRole="button"
        accessibilityLabel="Add item"
        style={styles.fab}
      >
        <Ionicons name="add" size={24} color={colors.white} />
      </Pressable>

      {/* Inline, non-functional form preview (UI only) */}
      <View
        style={styles.formPreview}
        accessible
        accessibilityLabel="Item form preview"
      >
        <Typography
          size={16}
          family={fontFamily.semiBold}
          marginBottom={8}
          color={colors.DarkRed}
        >
          Create / Edit Item
        </Typography>
        <View style={styles.inputGroup}>
          <Typography size={12} color={colors.black} marginBottom={6}>
            Name
          </Typography>
          <TextInput
            placeholder="e.g., Margherita Pizza"
            placeholderTextColor={colors.grayLight}
            style={styles.input}
            value={nameInput}
            onChangeText={setNameInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <Typography size={12} color={colors.black} marginBottom={6}>
            Category
          </Typography>
          <TextInput
            placeholder="e.g., Burgers"
            placeholderTextColor={colors.grayLight}
            style={styles.input}
            value={categoryInput}
            onChangeText={setCategoryInput}
          />
        </View>

        <View style={styles.formActions}>
          <TouchableOpacity
            style={[styles.formBtn, styles.cancelBtn]}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            onPress={handleResetForm}
          >
            <Typography size={14} family={fontFamily.semiBold}>
              Cancel
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.formBtn, styles.saveBtn]}
            accessibilityRole="button"
            accessibilityLabel="Save"
            onPress={handleSave}
          >
            <Typography
              size={14}
              family={fontFamily.semiBold}
              color={colors.white}
            >
              {editingId ? "Update" : "Save"}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CrudScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIconBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.cardGray,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(6),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(200),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryPill: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(999),
    backgroundColor: colors.cardGray,
  },
  cardActions: {
    flexDirection: "row",
    gap: scale(10),
    marginTop: verticalScale(12),
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(10),
  },
  editBtn: {
    backgroundColor: colors.cardGray,
  },
  deleteBtn: {
    backgroundColor: colors.DarkRed,
  },
  actionText: {
    marginLeft: scale(6),
  },
  fab: {
    position: "absolute",
    right: scale(16),
    bottom: scale(24),
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  formPreview: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: "#EEF2F7",
  },
  inputGroup: {
    marginBottom: verticalScale(12),
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontFamily: fontFamily.regular,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  formActions: {
    flexDirection: "row",
    gap: scale(12),
    marginTop: verticalScale(6),
  },
  formBtn: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: colors.cardGray,
  },
  saveBtn: {
    backgroundColor: colors.DarkRed,
  },
});
