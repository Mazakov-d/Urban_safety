import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Upload, Camera, Check, Info } from 'lucide-react-native';

export default function VerificationScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState({
    idCard: false,
    addressProof: false,
    phoneNumber: false,
  });

  const completeVerification = () => {
    // In a real app, this would submit verification to backend
    router.replace('/(tabs)');
  };

  const handleStepComplete = (step) => {
    // Mock completion of verification step
    if (step === 'idCard') {
      setVerificationStatus(prev => ({ ...prev, idCard: true }));
    } else if (step === 'addressProof') {
      setVerificationStatus(prev => ({ ...prev, addressProof: true }));
    } else if (step === 'phoneNumber') {
      setVerificationStatus(prev => ({ ...prev, phoneNumber: true }));
    }
  };

  const getNextButtonStyle = () => {
    const baseStyle = [styles.nextButton];
    const isDisabled = (currentStep === 1 && !verificationStatus.idCard) ||
                      (currentStep === 2 && !verificationStatus.addressProof) ||
                      (currentStep === 3 && !verificationStatus.phoneNumber);
    
    if (isDisabled) {
      baseStyle.push(styles.nextButtonDisabled);
    }
    
    return baseStyle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Verification</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>Step {currentStep} of 3</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {currentStep === 1 ? "Verify Your Identity" : 
           currentStep === 2 ? "Proof of Address" : "Phone Verification"}
        </Text>
        
        <Text style={styles.description}>
          {currentStep === 1 ? "Please upload a government-issued photo ID to verify your identity. This helps ensure community safety." : 
           currentStep === 2 ? "Please provide proof of your residential address (utility bill, bank statement, etc.)." : 
           "Verify your phone number to enable alerts and notifications."}
        </Text>

        <View style={styles.infoBox}>
          <Info size={20} color="#3B82F6" />
          <Text style={styles.infoText}>
            {currentStep === 1 ? "We take your privacy seriously. Your ID will only be used for verification and stored securely." : 
             currentStep === 2 ? "Your address information helps us connect you with nearby community members." : 
             "Your phone number will only be used for verification and emergency alerts."}
          </Text>
        </View>

        {currentStep === 1 && !verificationStatus.idCard && (
          <View style={styles.uploadSection}>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => handleStepComplete('idCard')}
            >
              <Upload size={24} color="#3B82F6" />
              <Text style={styles.uploadText}>Upload ID</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={() => handleStepComplete('idCard')}
            >
              <Camera size={24} color="#3B82F6" />
              <Text style={styles.uploadText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentStep === 2 && !verificationStatus.addressProof && (
          <View style={styles.uploadSection}>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={() => handleStepComplete('addressProof')}
            >
              <Upload size={24} color="#3B82F6" />
              <Text style={styles.uploadText}>Upload Document</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={() => handleStepComplete('addressProof')}
            >
              <Camera size={24} color="#3B82F6" />
              <Text style={styles.uploadText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentStep === 3 && !verificationStatus.phoneNumber && (
          <TouchableOpacity 
            style={styles.verifyPhoneButton}
            onPress={() => handleStepComplete('phoneNumber')}
          >
            <Text style={styles.verifyPhoneText}>Verify Phone Number</Text>
          </TouchableOpacity>
        )}

        {verificationStatus.idCard && currentStep === 1 && (
          <View style={styles.completedStep}>
            <Check size={24} color="#10B981" />
            <Text style={styles.completedText}>ID verification submitted</Text>
          </View>
        )}

        {verificationStatus.addressProof && currentStep === 2 && (
          <View style={styles.completedStep}>
            <Check size={24} color="#10B981" />
            <Text style={styles.completedText}>Address verification submitted</Text>
          </View>
        )}

        {verificationStatus.phoneNumber && currentStep === 3 && (
          <View style={styles.completedStep}>
            <Check size={24} color="#10B981" />
            <Text style={styles.completedText}>Phone number verified</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity 
            style={styles.backStepButton}
            onPress={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          >
            <Text style={styles.backStepText}>Previous</Text>
          </TouchableOpacity>
        )}

        {currentStep < 3 ? (
          <TouchableOpacity 
            style={getNextButtonStyle()}
            disabled={(currentStep === 1 && !verificationStatus.idCard) || 
                     (currentStep === 2 && !verificationStatus.addressProof)}
            onPress={() => setCurrentStep(prev => Math.min(3, prev + 1))}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={getNextButtonStyle()}
            disabled={!verificationStatus.phoneNumber}
            onPress={completeVerification}
          >
            <Text style={styles.nextButtonText}>Complete Verification</Text>
          </TouchableOpacity>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 24,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  uploadSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  uploadButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  cameraButton: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 8,
  },
  verifyPhoneButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyPhoneText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  completedStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  completedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#10B981',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  backStepButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginRight: 8,
  },
  backStepText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#3B82F6',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  nextButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});