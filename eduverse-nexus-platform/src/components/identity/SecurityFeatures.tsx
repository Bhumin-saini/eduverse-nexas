
import React from 'react';
import { Fingerprint, QrCode, Shield } from 'lucide-react';
import SecurityFeature from './SecurityFeature';
import VerificationCode from './VerificationCode';

const SecurityFeatures = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Secure Access & Authentication</h3>
      
      <div className="space-y-6">
        <SecurityFeature 
          icon={Fingerprint}
          iconColor="text-eduverse-primary"
          title="Biometric Verification"
          description="Secure exam check-ins and facility access with fingerprint or facial recognition."
        />
        
        <SecurityFeature 
          icon={QrCode}
          iconColor="text-eduverse-secondary"
          title="Contactless Entry"
          description="Quick access to buildings, libraries, and labs using NFC or QR code scanning."
        />
        
        <SecurityFeature 
          icon={Shield}
          iconColor="text-eduverse-accent"
          title="Privacy Controls"
          description="Zero-knowledge proofs ensure your data remains private while verifying your credentials."
        />
        
        <VerificationCode />
      </div>
    </div>
  );
};

export default SecurityFeatures;
