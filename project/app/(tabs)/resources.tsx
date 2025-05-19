import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FileText, Phone, ShieldAlert, ChevronRight, MapPin, Users, AlertCircle } from 'lucide-react-native';

export default function ResourcesScreen() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Safety Resources</Text>
        <FileText size={24} color="#1F2937" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <EmergencyCallSection onCall={handleCall} />
        
        <ResourceSection
          icon={<ShieldAlert size={24} color="#EF4444" />}
          title="Emergency Services"
          expanded={expandedSection === 'emergency'}
          onToggle={() => toggleSection('emergency')}
        >
          <EmergencyServiceItem 
            title="Police Department"
            address="123 Main Street"
            phone="911"
            onCall={() => handleCall('911')}
          />
          <EmergencyServiceItem 
            title="Fire Department"
            address="456 Oak Avenue"
            phone="911"
            onCall={() => handleCall('911')}
          />
          <EmergencyServiceItem 
            title="Ambulance Services"
            address="789 Medical Center Blvd"
            phone="911"
            onCall={() => handleCall('911')}
          />
        </ResourceSection>
        
        <ResourceSection
          icon={<MapPin size={24} color="#10B981" />}
          title="Safe Locations"
          expanded={expandedSection === 'locations'}
          onToggle={() => toggleSection('locations')}
        >
          <SafeLocationItem 
            title="Central Library"
            address="100 Larkin St"
            hours="9:00 AM - 8:00 PM"
            type="Public Building"
          />
          <SafeLocationItem 
            title="City Hospital"
            address="1001 Potrero Ave"
            hours="24 hours"
            type="Medical Facility"
          />
          <SafeLocationItem 
            title="Police Station"
            address="1125 Fillmore St"
            hours="24 hours"
            type="Emergency Services"
          />
        </ResourceSection>
        
        <ResourceSection
          icon={<Users size={24} color="#3B82F6" />}
          title="Community Partners"
          expanded={expandedSection === 'partners'}
          onToggle={() => toggleSection('partners')}
        >
          <CommunityPartnerItem 
            name="Safety First Coalition"
            description="Community organization focused on neighborhood safety initiatives."
            phone="555-123-4567"
            onCall={() => handleCall('5551234567')}
          />
          <CommunityPartnerItem 
            name="Urban Outreach Center"
            description="Provides resources and support for vulnerable populations."
            phone="555-987-6543"
            onCall={() => handleCall('5559876543')}
          />
          <CommunityPartnerItem 
            name="Crisis Response Team"
            description="Trained professionals for mental health crisis intervention."
            phone="555-456-7890"
            onCall={() => handleCall('5554567890')}
          />
        </ResourceSection>
        
        <ResourceSection
          icon={<AlertCircle size={24} color="#F59E0B" />}
          title="Safety Guides"
          expanded={expandedSection === 'guides'}
          onToggle={() => toggleSection('guides')}
        >
          <SafetyGuideItem 
            title="Personal Safety Tips"
            description="Essential guidelines for staying safe in urban environments."
          />
          <SafetyGuideItem 
            title="Emergency Preparedness"
            description="How to prepare for and respond to emergency situations."
          />
          <SafetyGuideItem 
            title="Bystander Intervention"
            description="How to safely intervene when witnessing potentially dangerous situations."
          />
        </ResourceSection>
      </ScrollView>
    </View>
  );
}

function EmergencyCallSection({ onCall }) {
  return (
    <TouchableOpacity 
      style={styles.emergencyCallContainer}
      onPress={() => onCall('911')}
    >
      <View style={styles.emergencyCallContent}>
        <Text style={styles.emergencyCallTitle}>Emergency? Call 911</Text>
        <Text style={styles.emergencyCallText}>
          For immediate emergency assistance
        </Text>
      </View>
      <View style={styles.emergencyCallButton}>
        <Phone size={24} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}

function ResourceSection({ icon, title, children, expanded, onToggle }) {
  return (
    <View style={styles.resourceSection}>
      <TouchableOpacity 
        style={styles.sectionHeader}
        onPress={onToggle}
      >
        <View style={styles.sectionTitleContainer}>
          {icon}
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <ChevronRight size={20} color="#6B7280" style={[
          styles.chevron,
          expanded && styles.chevronExpanded
        ]} />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  );
}

function EmergencyServiceItem({ title, address, phone, onCall }) {
  return (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{title}</Text>
        <Text style={styles.serviceAddress}>{address}</Text>
      </View>
      <TouchableOpacity 
        style={styles.serviceCallButton}
        onPress={onCall}
      >
        <Phone size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

function SafeLocationItem({ title, address, hours, type }) {
  return (
    <View style={styles.locationItem}>
      <Text style={styles.locationTitle}>{title}</Text>
      <Text style={styles.locationAddress}>{address}</Text>
      <View style={styles.locationDetails}>
        <Text style={styles.locationHours}>{hours}</Text>
        <View style={styles.locationTypeBadge}>
          <Text style={styles.locationTypeText}>{type}</Text>
        </View>
      </View>
    </View>
  );
}

function CommunityPartnerItem({ name, description, phone, onCall }) {
  return (
    <View style={styles.partnerItem}>
      <View style={styles.partnerInfo}>
        <Text style={styles.partnerName}>{name}</Text>
        <Text style={styles.partnerDescription}>{description}</Text>
      </View>
      <TouchableOpacity 
        style={styles.partnerCallButton}
        onPress={onCall}
      >
        <Phone size={20} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );
}

function SafetyGuideItem({ title, description }) {
  return (
    <TouchableOpacity style={styles.guideItem}>
      <View>
        <Text style={styles.guideTitle}>{title}</Text>
        <Text style={styles.guideDescription}>{description}</Text>
      </View>
      <ChevronRight size={20} color="#6B7280" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
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
  emergencyCallContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencyCallContent: {
    flex: 1,
  },
  emergencyCallTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 4,
  },
  emergencyCallText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  emergencyCallButton: {
    backgroundColor: '#EF4444',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  serviceCallButton: {
    backgroundColor: '#EF4444',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationItem: {
    marginBottom: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  locationTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  locationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationHours: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  locationTypeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  locationTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
  },
  partnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  partnerInfo: {
    flex: 1,
    marginRight: 8,
  },
  partnerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  partnerDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  partnerCallButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  guideTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  guideDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
});