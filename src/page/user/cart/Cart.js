import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCartByUser, deleteCart } from "../../../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "../../../component/customToast";
const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const { listCart, isLoading, isError, errorMessage } = useSelector(
    (state) => state.cart
  );

  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const userID = 1;

  useEffect(() => {
    dispatch(getCartByUser(userID));
  }, [dispatch, userID]);

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((total, courseID) => {
      const course = cartItems.find(
        (item) => (item.courseID || item.id) === courseID
      );
      return total + (course ? parseFloat(course.price) : 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  const handleSelectItem = (courseID) => {
    if (selectedItems.includes(courseID)) {
      setSelectedItems(selectedItems.filter((id) => id !== courseID));
    } else {
      setSelectedItems([...selectedItems, courseID]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.courseID || item.id));
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      dispatch(deleteCart(selectedItems))
        .then(() => {
          setSelectedItems([]);
          dispatch(getCartByUser(userID));
        })
        .catch((error) => {
          alert("Failed to remove selected courses: " + error.message);
        });
    } else {
      alert("No courses selected for removal.");
    }
  };

  const handlePurchase = () => {
    if (selectedItems.length > 0) {
      Alert.alert(
        "Confirm Purchase",
        `Are you sure you want to purchase ${
          selectedItems.length
        } course(s) for $${totalPrice.toFixed(2)}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Purchase",
            onPress: () => {
              // Implement purchase logic here
              console.log("Purchasing courses:", selectedItems);
              Alert.alert(
                "Purchase Successful",
                "Thank you for your purchase!"
              );
              setSelectedItems([]);
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "No Courses Selected",
        "Please select at least one course to purchase."
      );
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text style={styles.errorMessage}>Error: {errorMessage}</Text>;
  }

  const cartItems = listCart?.DT || [];
  if (cartItems.length === 0) {
    return <Text style={styles.emptyCart}>Your cart is empty!</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) =>
          item.courseID ? item.courseID.toString() : item.id.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => handleSelectItem(item.courseID || item.id)}
            >
              <View
                style={[
                  styles.checkBoxInner,
                  selectedItems.includes(item.courseID || item.id) &&
                    styles.checkBoxChecked,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("courseDetailOverView", {
                  courseId: item.courseId,
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.courseImage} />
            </TouchableOpacity>
            <View style={styles.courseDetails}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("courseDetailOverView", {
                    courseId: item.courseId,
                  })
                }
              >
                <Text style={styles.courseName}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.instructorName}>{item.userName}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{item.averageRating}</Text>
                <Text style={styles.reviews}>({item.totalRating} reviews)</Text>
              </View>
              <Text style={styles.lessons}>{item.totalLessons} lessons</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <TouchableOpacity
            style={styles.selectAllButton}
            onPress={handleSelectAll}
          >
            <Text style={styles.selectAllText}>
              {selectedItems.length === cartItems.length
                ? "Deselect All"
                : "Select All"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.footerBottom}>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={handlePurchase}
          >
            <Text style={styles.purchaseButtonText}>Purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleRemoveSelected}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  courseItem: {
    marginVertical: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  instructorName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginLeft: 5,
  },
  reviews: {
    fontSize: 12,
    color: "#777",
  },
  lessons: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  emptyCart: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  footerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
  },
  selectAllButton: {
    padding: 10,
    backgroundColor: "#69E41D",
    borderRadius: 5,
  },
  selectAllText: {
    color: "white",
    fontWeight: "bold",
  },
  purchaseButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#00BDD6",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  purchaseButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  clearButton: {
    padding: 10,
    backgroundColor: "#FF0000",
    borderRadius: 5,
    alignItems: "center",
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#00BDD6",
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxInner: {
    width: 12,
    height: 12,
    borderRadius: 1,
  },
  checkBoxChecked: {
    backgroundColor: "#00BDD6",
  },
});
