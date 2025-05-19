import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Switch } from 'react-native';
import { User, Shield, Bell, Lock, ChevronRight, LogOut, Settings, HelpCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  
  const handleLogout = () => {
    router.replace('/(auth)/welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <User size={40} color="#6B7280" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Jennifer Wilson</Text>
              <View style={styles.verificationBadge}>
                <Shield size={14} color="#10B981" />
                <Text style={styles.verificationText}>Verified User</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.trustScore}>
            <Text style={styles.trustScoreLabel}>Trust Score</Text>
            <View style={styles.trustScoreBar}>
              <View style={[styles.trustScoreFill, { width: '85%' }]} />
            </View>
            <Text style={styles.trustScoreValue}>85%</Text>
          </View>
          
          <Text style={styles.trustScoreDescription}>
            Based on your verification level and community activity
          </Text>
          
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Improve Trust Score</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Account</Text>
        
        <View style={styles.settingsCard}>
          <SettingsItem
            icon={<User size={20} color="#6B7280" />}
            title="Personal Information"
            showChevron={true}
          />
          <SettingsItem
            icon={<Shield size={20} color="#6B7280" />}
            title="Verification Status"
            description="ID & Address Verified"
            showChevron={true}
          />
          <SettingsItem
            icon={<Bell size={20} color="#6B7280" />}
            title="Notification Settings"
            showChevron={true}
          />
          <SettingsItem
            icon={<Lock size={20} color="#6B7280" />}
            title="Privacy Settings"
            showChevron={true}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Safety Preferences</Text>
        
        <View style={styles.settingsCard}>
          <SettingsToggleItem
            icon={<Bell size={20} color="#6B7280" />}
            title="Receive Alert Notifications"
            value={true}
          />
          <SettingsToggleItem
            icon={<User size={20} color="#6B7280" />}
            title="Available to Help Others"
            value={true}
          />
          <SettingsToggleItem
            icon={<MapPin size={20} color="#6B7280" />}
            title="Share My Location"
            description="Only with verified users during alerts"
            value={true}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Support</Text>
        
        <View style={styles.settingsCard}>
          <SettingsItem
            icon={<HelpCircle size={20} color="#6B7280" />}
            title="Help & FAQ"
            showChevron={true}
          />
          <SettingsItem
            icon={<MessageSquare size={20} color="#6B7280" />}
            title="Contact Support"
            showChevron={true}
          />
          <SettingsItem
            icon={<FileText size={20} color="#6B7280" />}
            title="Terms of Service"
            showChevron={true}
          />
          <SettingsItem
            icon={<Lock size={20} color="#6B7280" />}
            title="Privacy Policy"
            showChevron={true}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>Urban Sanctuary v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

function SettingsItem({ icon, title, description, showChevron }) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsItemIcon}>
        {icon}
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingsItemDescription}>{description}</Text>
        )}
      </View>
      {showChevron && (
        <ChevronRight size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

function SettingsToggleItem({ icon, title, description, value }) {
  return (
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemIcon}>
        {icon}
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={styles.settingsItemTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingsItemDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={() => {}}
        trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
        thumbColor={value ? '#3B82F6' : '#9CA3AF'}
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );
}

// Fixing missing icon imports
import { MessageSquare, MapPin, FileText } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  verificationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  trustScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trustScoreLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    width: 90,
  },
  trustScoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  trustScoreFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  trustScoreValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#10B981',
    width: 40,
    textAlign: 'right',
  },
  trustScoreDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  settingsItemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
});