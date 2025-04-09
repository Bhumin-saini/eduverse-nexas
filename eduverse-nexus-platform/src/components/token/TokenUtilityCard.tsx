
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface TokenUtilityItem {
  name: string;
  cost: string;
}

interface TokenUtilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  items: TokenUtilityItem[];
  buttonText: string;
  introText: string;
}

const TokenUtilityCard = ({
  title,
  description,
  icon: Icon,
  iconColor,
  items,
  buttonText,
  introText
}: TokenUtilityCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <Icon className={`h-10 w-10 ${iconColor} mb-2`} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{introText}</p>
        <ul className="space-y-2 text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item.name}</span>
              <span className="font-semibold">{item.cost}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">{buttonText}</Button>
      </CardFooter>
    </Card>
  );
};

export default TokenUtilityCard;
