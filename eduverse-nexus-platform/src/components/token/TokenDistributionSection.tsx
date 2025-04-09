
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const tokenDistributionData = [
  { name: 'Academic', value: 40, color: '#4361ee' },
  { name: 'Co-curricular', value: 30, color: '#3a0ca3' },
  { name: 'Leadership', value: 15, color: '#7209b7' },
  { name: 'Community', value: 15, color: '#f72585' }
];

const tokenEarningsData = [
  { name: 'Week 1', Earned: 50, Spent: 20 },
  { name: 'Week 2', Earned: 75, Spent: 35 },
  { name: 'Week 3', Earned: 110, Spent: 40 },
  { name: 'Week 4', Earned: 90, Spent: 60 }
];

const TokenDistributionSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Token Distribution</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EduPoints are distributed across various activities to encourage holistic student development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Token Allocation</CardTitle>
                <CardDescription>Distribution of EduPoints across different categories</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={tokenDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {tokenDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Monthly Token Activity</CardTitle>
                <CardDescription>Your token earnings and spending this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={tokenEarningsData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Earned" fill="#4361ee" />
                      <Bar dataKey="Spent" fill="#f72585" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDistributionSection;
