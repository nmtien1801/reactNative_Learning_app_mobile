import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight, User, Lock } from 'lucide-react-native';



const SettingItem = ({ label, value, onPress, showChevron = true }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingContent}>
      <Text style={styles.settingLabel}>{label}</Text>
      {value && <Text style={styles.settingValue}>{value}</Text>}
    </View>
    {showChevron && <ChevronRight size={20} color="#666" />}
  </TouchableOpacity>
);

const SectionHeader = ({ title, subtitle }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {subtitle && (
      <TouchableOpacity>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function Setting({navigation, route}) {
  const handlePress = (section) => {
    console.log(`Navigating to ${section}`);
  };

  return (
    <ScrollView style={styles.container}>
      <SectionHeader 
        title="Thông tin cá nhân"
        subtitle="Quản lý thông tin cá nhân của bạn"
      />

      <SectionHeader 
        title="Thông tin cơ bản"
        subtitle="Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn"
      />

      <View style={styles.settingsGroup}>
        <SettingItem
          label="Họ và tên"
          value="Tiến Nguyễn"
          onPress={() => handlePress('name')}
        />
        <SettingItem
          label="Tên người dùng"
          value="nguyentien96"
          onPress={() => handlePress('username')}
        />
        <SettingItem
          label="Giới thiệu"
          value="chưa cập nhật"
          onPress={() => handlePress('bio')}
        />
        <SettingItem
          label="Ảnh đại diện"
          onPress={() => handlePress('avatar')}
        />
      </View>

      <SectionHeader 
        title="Mật khẩu và vào mật"
        subtitle="Quản lý mật khẩu và cài đặt bảo mật"
      />

      <SectionHeader 
        title="Đăng nhập & khôi phục"
        subtitle="Quản lý mật khẩu"
      />

      <View style={styles.settingsGroup}>
        <SettingItem
          label="Đổi mật khẩu"
          value="Chưa đổi mật khẩu"
          onPress={() => navigation.navigate('changePassword')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionHeader: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  settingsGroup: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});