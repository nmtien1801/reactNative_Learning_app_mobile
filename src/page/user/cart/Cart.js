import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartByUser,
  addCart,
  removeFromCart,
  clearCart,
} from "../../../redux/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Add navigation

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Get navigation prop

  // Redux states
  const { listCart, isLoading, isError, errorMessage } = useSelector(
    (state) => state.cart
  );

  const userID = 1; // Simulate userID (could come from props or state)

  // Fetch cart data when the component mounts
  useEffect(() => {
    console.log("Dispatching getCartByUser for userID:", userID);
    dispatch(getCartByUser(userID)); // Fetch user's cart data
  }, [dispatch, userID]);

  // Add course to cart
  const handleAddToCart = (course) => {
    dispatch(addCart(course)); // Add to cart API
  };

  // Remove course from cart
  const handleRemoveFromCart = (course) => {
    dispatch(removeFromCart(course)); // Remove from cart API
  };

  // Clear all items from cart
  const handleClearCart = () => {
    dispatch(clearCart()); // Clear all items from the cart
  };

  // Show loading indicator when data is fetching
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Show error message if data fetching fails
  if (isError) {
    return <Text style={styles.errorMessage}>Error: {errorMessage}</Text>;
  }

  // Safeguard for empty cart
  const cartItems = listCart?.DT || []; // Safe fallback to empty array if listCart.DT is undefined or null
  console.log("listCart:", listCart);
  console.log("cartItems:", cartItems);

  // If cart is empty, show message
  if (cartItems.length === 0) {
    return <Text style={styles.emptyCart}>Your cart is empty!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("courseDetailOverView", {
                    courseId: item.id,
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.courseImage}
                />
              </TouchableOpacity>
              <View style={styles.courseDetails}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("courseDetailOverView", {
                      courseId: item.id,
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
                  <Text style={styles.reviews}>
                    ({item.totalRating} reviews)
                  </Text>
                </View>
                <Text style={styles.lessons}>{item.totalLessons} lessons</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty!</Text>
      )}

      {/* Clear Cart Button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.buttonText}>Clear Cart</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
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
  clearButton: {
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
