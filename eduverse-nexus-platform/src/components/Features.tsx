
import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, BookOpen, Users, Award, Database, Fingerprint } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color = "bg-blue-100 text-eduverse-primary"
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}) => {
  return (
    <Card className="card-hover p-6 border border-gray-100">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

const Features = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Campus Life with Blockchain</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EduVerse integrates every aspect of student life into a unified ecosystem powered by EDU Chain technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Digital Identity"
            description="Secure on-chain storage of student identities with privacy controls and biometric verification."
            color="bg-blue-100 text-eduverse-primary"
          />
          
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Academic Dashboard"
            description="Track your progress, verify prerequisites, and receive AI-powered course recommendations."
            color="bg-purple-100 text-eduverse-secondary"
          />
          
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Collaborative Learning"
            description="Exchange materials, form study groups, and participate in peer review systems."
            color="bg-indigo-100 text-indigo-600"
          />
          
          <FeatureCard
            icon={<Award className="h-6 w-6" />}
            title="EduPoints Economy"
            description="Earn tokens for academic achievements and co-curricular activities with real utility on campus."
            color="bg-pink-100 text-eduverse-accent"
          />
          
          <FeatureCard
            icon={<Database className="h-6 w-6" />}
            title="DAO Governance"
            description="Participate in campus decision-making through a decentralized autonomous organization."
            color="bg-green-100 text-green-600"
          />
          
          <FeatureCard
            icon={<Fingerprint className="h-6 w-6" />}
            title="Verified Achievements"
            description="NFT-based recognition for accomplishments and skill verifications from faculty and peers."
            color="bg-orange-100 text-orange-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
