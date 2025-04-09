
import React, { ReactNode } from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface SecurityFeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

const SecurityFeature = ({ title, description, icon: Icon, iconColor = "text-eduverse-primary" }: SecurityFeatureProps) => {
  return (
    <Card className="p-5 border border-gray-100 card-hover">
      <h4 className="text-lg font-bold flex items-center mb-2">
        <Icon className={`h-5 w-5 ${iconColor} mr-2`} />
        {title}
      </h4>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

export default SecurityFeature;
