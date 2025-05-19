import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Shield, MapPin, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']}
        style={styles.gradient}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Urban Sanctuary</Text>
        <Text style={styles.subtitle}>Community-based safety at your fingertips</Text>
      </View>
      
      <View style={styles.features}>
        <FeatureItem 
          icon={<Shield color="#3B82F6" size={32} />}
          title="Verified Community"
          description="Join a trusted network of verified members ready to help"
        />
        <FeatureItem 
          icon={<MapPin color="#3B82F6" size={32} />}
          title="Safe Locations"
          description="Find immediate safety with secure building access"
        />
        <FeatureItem 
          icon={<Bell color="#3B82F6" size={32} />}
          title="Emergency Alerts"
          description="Send alerts to nearby verified users when in danger"
        />
      </View>
      
      <View style={styles.actions}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Create Account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

function FeatureItem({ icon, title, description }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  header: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 48,
  },
  features: {
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(239, 246, 255, 0.7)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  actions: {
    marginTop: 'auto',
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#3B82F6',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});