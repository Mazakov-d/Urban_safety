import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated, Easing } from 'react-native';
import { X, AlertTriangle, MessageCircle, Phone, SirenAlert } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';

export default function EmergencyScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(true);
  const [alertLevel, setAlertLevel] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  
  // Simulated pulse animation
  const [pulseAnim] = useState(new Animated.Value(1));
  
  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        })
      ])
    ).start();
  };
  
  const handleSelectLevel = (level) => {
    setAlertLevel(level);
    setIsConfirming(true);
  };
  
  const handleConfirmAlert = () => {
    setAlertSent(true);
    startPulse();
    // Would send the actual alert here in a real app
  };
  
  const handleCancel = () => {
    if (alertSent) {
      setAlertSent(false);
    } else if (isConfirming) {
      setIsConfirming(false);
    } else {
      setModalVisible(false);
      router.replace('/');
    }
  };

  const renderInitialOptions = () => (
    <>
      <Text style={styles.modalTitle}>Emergency Alert</Text>
      <Text style={styles.modalDescription}>
        Select the type of assistance you need. This will alert verified community members nearby.
      </Text>
      
      <TouchableOpacity 
        style={[styles.alertOption, styles.emergencyOption]}
        onPress={() => handleSelectLevel('emergency')}
      >
        <AlertTriangle size={24} color="#FFFFFF" />
        <Text style={styles.emergencyOptionText}>Emergency Situation</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.alertOption, styles.unsafeOption]}
        onPress={() => handleSelectLevel('unsafe')}
      >
        <SirenAlert size={24} color="#FFFFFF" />
        <Text style={styles.unsafeOptionText}>Feeling Unsafe</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.alertOption, styles.assistanceOption]}
        onPress={() => handleSelectLevel('assistance')}
      >
        <MessageCircle size={24} color="#FFFFFF" />
        <Text style={styles.assistanceOptionText}>Need Assistance</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <X size={24} color="#6B7280" />
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
  
  const renderConfirmation = () => {
    const levelInfo = {
      emergency: {
        title: 'Emergency Alert',
        description: 'This will alert all verified members nearby and optionally contact emergency services.',
        color: '#EF4444'
      },
      unsafe: {
        title: 'Feeling Unsafe',
        description: 'This will alert verified members nearby that you need assistance.',
        color: '#F59E0B'
      },
      assistance: {
        title: 'Request Assistance',
        description: 'This will notify verified members that you need help.',
        color: '#3B82F6'
      }
    };
    
    const info = levelInfo[alertLevel];
    
    return (
      <>
        <Text style={[styles.confirmTitle, { color: info.color }]}>{info.title}</Text>
        <Text style={styles.confirmDescription}>{info.description}</Text>
        
        <Text style={styles.confirmPrompt}>Are you sure you want to send this alert?</Text>
        
        <TouchableOpacity 
          style={[styles.confirmButton, { backgroundColor: info.color }]}
          onPress={handleConfirmAlert}
        >
          <Text style={styles.confirmButtonText}>Confirm Alert</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <X size={24} color="#6B7280" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </>
    );
  };
  
  const renderAlertSent = () => {
    const levelInfo = {
      emergency: {
        title: 'Emergency Alert Sent',
        description: 'Your emergency alert has been sent to nearby verified members.',
        color: '#EF4444'
      },
      unsafe: {
        title: 'Alert Sent',
        description: 'Your alert has been sent to nearby verified members.',
        color: '#F59E0B'
      },
      assistance: {
        title: 'Assistance Request Sent',
        description: 'Your request for assistance has been sent to nearby verified members.',
        color: '#3B82F6'
      }
    };
    
    const info = levelInfo[alertLevel];
    
    return (
      <>
        <Animated.View 
          style={[
            styles.pulseCircle, 
            { 
              borderColor: info.color,
              transform: [{ scale: pulseAnim }]
            }
          ]}
        >
          <SirenAlert size={48} color={info.color} />
        </Animated.View>
        
        <Text style={[styles.alertSentTitle, { color: info.color }]}>{info.title}</Text>
        <Text style={styles.alertSentDescription}>{info.description}</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={24} color="#3B82F6" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={24} color="#3B82F6" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.cancelAlertButton, { borderColor: info.color }]}
          onPress={handleCancel}
        >
          <Text style={[styles.cancelAlertText, { color: info.color }]}>Cancel Alert</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EF4444', '#F59E0B']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {!isConfirming && !alertSent && renderInitialOptions()}
            {isConfirming && !alertSent && renderConfirmation()}
            {alertSent && renderAlertSent()}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '80%',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  alertOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  emergencyOption: {
    backgroundColor: '#EF4444',
  },
  emergencyOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  unsafeOption: {
    backgroundColor: '#F59E0B',
  },
  unsafeOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  assistanceOption: {
    backgroundColor: '#3B82F6',
  },
  assistanceOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  confirmTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  confirmPrompt: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  confirmButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
  pulseCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 24,
  },
  alertSentTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  alertSentDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    width: '40%',
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#3B82F6',
    marginTop: 8,
  },
  cancelAlertButton: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelAlertText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});