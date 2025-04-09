
import React from 'react';
import { Shield, Lock, Smartphone, Plug, Share2, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const IdentityFeatures = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Identity Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="card-hover">
            <CardHeader>
              <Shield className="h-10 w-10 text-eduverse-primary mb-2" />
              <CardTitle>Blockchain Verification</CardTitle>
              <CardDescription>Tamper-proof credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your academic records and personal credentials are cryptographically secured on the blockchain, making them immutable and verifiable by any authorized party.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Lock className="h-10 w-10 text-eduverse-secondary mb-2" />
              <CardTitle>Privacy Controls</CardTitle>
              <CardDescription>You own your data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Granular control over what information is shared, with whom, and for how long. Revoke access at any time with our zero-knowledge proof technology.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Review Privacy Settings</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Smartphone className="h-10 w-10 text-eduverse-accent mb-2" />
              <CardTitle>Biometric Authentication</CardTitle>
              <CardDescription>Secure access methods</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Secure your identity with fingerprint, facial recognition, or other biometric factors. Multi-factor authentication protects your digital identity.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Setup Biometrics</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Plug className="h-10 w-10 text-eduverse-info mb-2" />
              <CardTitle>Campus Access</CardTitle>
              <CardDescription>Seamless verification</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Use your digital ID for access to buildings, labs, libraries, and other campus facilities through NFC and Bluetooth integration.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Manage Access Points</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Share2 className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Selective Disclosure</CardTitle>
              <CardDescription>Share only what you want</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Create customized profiles for different situations - share academic credentials with employers, but keep personal information private.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Create Disclosure Profile</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <BadgeCheck className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Verified Achievements</CardTitle>
              <CardDescription>Blockchain-attested accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">All your academic and co-curricular achievements are verified on-chain, creating a trustworthy record of your capabilities and experiences.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Your Achievements</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IdentityFeatures;
