import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Bell, MessageCircle, Phone, ExternalLink, CheckCircle } from 'lucide-react-native';

export default function AlertsScreen() {
  const [activeTab, setActiveTab] = useState('active');
  
  const activeAlerts = [
    {
      id: '1',
      type: 'emergency',
      user: 'Michael S.',
      location: 'Market Street & 7th',
      time: '2 minutes ago',
      status: 'Responded'
    },
    {
      id: '2',
      type: 'unsafe',
      user: 'Lisa K.',
      location: 'Powell Street Station',
      time: '5 minutes ago',
      status: 'Pending'
    }
  ];
  
  const historyAlerts = [
    {
      id: '3',
      type: 'assistance',
      user: 'David W.',
      location: 'Union Square',
      time: 'Yesterday, 8:45 PM',
      status: 'Resolved'
    },
    {
      id: '4',
      type: 'emergency',
      user: 'Sarah M.',
      location: 'Golden Gate Park',
      time: 'Yesterday, 3:20 PM',
      status: 'Resolved'
    },
    {
      id: '5',
      type: 'unsafe',
      user: 'Robert J.',
      location: 'Fillmore District',
      time: '2 days ago',
      status: 'Expired'
    }
  ];

  const renderAlertItem = ({ item }) => {
    const getTypeColor = (type) => {
      switch (type) {
        case 'emergency': return '#EF4444';
        case 'unsafe': return '#F59E0B';
        case 'assistance': return '#3B82F6';
        default: return '#6B7280';
      }
    };
    
    const getStatusStyle = (status) => {
      switch (status) {
        case 'Responded':
          return { color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)' };
        case 'Pending':
          return { color: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.1)' };
        case 'Resolved':
          return { color: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.1)' };
        case 'Expired':
          return { color: '#6B7280', backgroundColor: 'rgba(107, 114, 128, 0.1)' };
        default:
          return { color: '#6B7280', backgroundColor: 'rgba(107, 114, 128, 0.1)' };
      }
    };
    
    const getTypeLabel = (type) => {
      switch (type) {
        case 'emergency': return 'Emergency';
        case 'unsafe': return 'Feeling Unsafe';
        case 'assistance': return 'Assistance';
        default: return 'Alert';
      }
    };
    
    const statusStyle = getStatusStyle(item.status);
    
    return (
      <View style={styles.alertItem}>
        <View style={[styles.alertTypeIndicator, { backgroundColor: getTypeColor(item.type) }]} />
        
        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertType}>{getTypeLabel(item.type)}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
              <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
            </View>
          </View>
          
          <Text style={styles.alertUser}>{item.user}</Text>
          <Text style={styles.alertLocation}>{item.location}</Text>
          <Text style={styles.alertTime}>{item.time}</Text>
          
          {activeTab === 'active' && (
            <View style={styles.alertActions}>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color="#3B82F6" />
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={20} color="#3B82F6" />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <ExternalLink size={20} color="#3B82F6" />
                <Text style={styles.actionText}>Directions</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {activeTab === 'history' && item.status === 'Resolved' && (
            <View style={styles.resolvedContainer}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.resolvedText}>Resolved safely</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Bell size={24} color="#1F2937" />
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
          {activeAlerts.length > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{activeAlerts.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'active' && activeAlerts.length === 0 && (
        <View style={styles.emptyContainer}>
          <Bell size={64} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>No Active Alerts</Text>
          <Text style={styles.emptyDescription}>
            You don't have any active alerts at the moment. That's good news!
          </Text>
        </View>
      )}
      
      {activeTab === 'history' && historyAlerts.length === 0 && (
        <View style={styles.emptyContainer}>
          <Bell size={64} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>No Alert History</Text>
          <Text style={styles.emptyDescription}>
            You don't have any previous alerts. Your alert history will appear here.
          </Text>
        </View>
      )}
      
      <FlatList
        data={activeTab === 'active' ? activeAlerts : historyAlerts}
        renderItem={renderAlertItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  badgeContainer: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  badgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  alertItem: {
    flexDirection: 'row',
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
    elevation: 2,
    overflow: 'hidden',
  },
  alertTypeIndicator: {
    width: 6,
    height: '100%',
  },
  alertContent: {
    flex: 1,
    padding: 16,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertType: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1F2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  alertUser: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  alertLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  alertTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#3B82F6',
    marginLeft: 4,
  },
  resolvedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  resolvedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
  },
});