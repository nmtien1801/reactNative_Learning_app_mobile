import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchOrdersByUserId } from "../../redux/orderSlide"; // Assuming you have created redux slice

export default function StatisticsScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userID = user?._id || 1;

  // Fetch data from Redux
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersByUserId(userID));
  }, [dispatch, userID]);

  // UseMemo for calculating statistics to prevent re-calculation on every render
  const { totalCourses, totalStudents, totalRevenue } = useMemo(() => {
    let totalCourses = 0;
    let totalStudents = 0;
    let totalRevenue = 0;

    if (orders) {
      orders.forEach((order) => {
        totalRevenue += order.totalPrice; // Total revenue
        order.OrderDetails.forEach((detail) => {
          totalCourses += 1; // Count total courses
          totalStudents += detail.Course.UserFollow?.length || 0; // Count students enrolled
        });
      });
    }

    return { totalCourses, totalStudents, totalRevenue };
  }, [orders]);

  if (ordersLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (ordersError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {ordersError}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Statistics</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Total Orders */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statValue}>{orders?.length || 0}</Text>
        </View>

        {/* Total Revenue */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Revenue</Text>
          <View style={styles.revenueContainer}>
            <Text style={styles.statValue}>{totalRevenue}</Text>
            <Ionicons name="arrow-up" size={20} color="#22c55e" />
          </View>
        </View>

        {/* Total Courses */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Courses</Text>
          <Text style={styles.statValue}>{totalCourses}</Text>
        </View>

        {/* Total Students */}
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Students</Text>
          <Text style={styles.statValue}>{totalStudents}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1438425017/vi/vec-to/k%E1%BA%BF-to%C3%A1n-kinh-doanh-irs-ki%E1%BB%83m-to%C3%A1n-n%E1%BB%99i-b%E1%BB%99-vector-b%C3%A0n-b%E1%BA%A3ng-ho%E1%BA%B7c-seo-th%E1%BB%91ng-k%C3%AA-th%E1%BB%8B-tr%C6%B0%E1%BB%9Dng-b%C3%A1n.jpg?s=2048x2048&w=is&k=20&c=WEu21Ctyo6kln0SFfpGkxhDpeoE95jzCNEPNuSPkoDw=",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  statItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  revenueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  imageContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
});
