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
import {
  addToCart,
  removeFromCart as removeCourseFromCart,
} from "../../../redux/courseSlice";

const Cart = () => {
  const dispatch = useDispatch();

  // Redux states
  const { listCart, isLoading, isError, errorMessage } = useSelector(
    (state) => state.cart
  );
  const { listCourse } = useSelector((state) => state.course);

  const userID = 1; // Simulate userID (could come from props or state)

  // Fetch cart data when the component mounts
  useEffect(() => {
    dispatch(getCartByUser(userID)); // Fetch user's cart data
  }, [dispatch, userID]);

  // Add course to cart
  const handleAddToCart = (course) => {
    dispatch(addToCart(course));
    dispatch(addCart(course)); // Add to cart API
  };

  // Remove course from cart
  const handleRemoveFromCart = (course) => {
    dispatch(removeCourseFromCart(course));
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

  // If cart is empty, show message
  if (!listCart?.DT || listCart.DT.length === 0) {
    return <Text style={styles.emptyCart}>Your cart is empty!</Text>;
  }

  const cartItems = listCart.DT || []; // Safe fallback to empty array if no cart data
  console.log(cartItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: item.course.image }}
              style={styles.courseImage}
            />
            <Text style={styles.itemName}>{item.course.name}</Text>
            <Text style={styles.itemDescription}>
              {item.course.description}
            </Text>
            <Text style={styles.itemRating}>
              Average Rating: {item.course.averageRating || "N/A"} (Total
              Reviews: {item.course.totalRating})
            </Text>
            <Text style={styles.itemLessons}>
              Total Lessons: {item.course.totalLessons}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFromCart(item)}
            >
              <Text style={styles.buttonText}>Remove from Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.buttonText}>Clear Cart</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Available Courses</Text>

      {listCourse.length === 0 ? (
        <Text style={styles.emptyCart}>No courses available!</Text>
      ) : (
        <FlatList
          data={listCourse}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Text style={styles.courseName}>{item.course.name}</Text>
              <Text style={styles.courseDescription}>
                {item.course.description}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
  cartItem: {
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
    marginRight: 15,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    flex: 2,
  },
  itemRating: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  itemLessons: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    alignItems: "center",
  },
  courseItem: {
    marginVertical: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  courseName: {
    fontSize: 18,
    fontWeight: "600",
  },
  courseDescription: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#32CD32",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  clearButton: {
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
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
});
