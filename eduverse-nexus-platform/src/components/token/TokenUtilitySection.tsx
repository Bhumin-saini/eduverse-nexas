
import React from 'react';
import { Store, Clock, Ticket, DollarSign, Wallet, Gift } from 'lucide-react';
import TokenUtilityCard from './TokenUtilityCard';

const TokenUtilitySection = () => {
  const utilityCards = [
    {
      title: "Campus Services",
      description: "Discounts and priority access",
      icon: Store,
      iconColor: "text-eduverse-primary",
      introText: "Use your tokens for discounts at the bookstore, cafeteria, and other campus services.",
      items: [
        { name: "10% Cafeteria Discount", cost: "100 points" },
        { name: "Bookstore Coupon", cost: "200 points" },
        { name: "Printing Credits", cost: "50 points" }
      ],
      buttonText: "View Campus Offers"
    },
    {
      title: "Priority Access",
      description: "Skip the line privileges",
      icon: Clock,
      iconColor: "text-eduverse-secondary",
      introText: "Use tokens for early registration, facility booking, and other priority services.",
      items: [
        { name: "Early Course Registration", cost: "300 points" },
        { name: "Study Room Reservation", cost: "75 points" },
        { name: "Lab Equipment Priority", cost: "150 points" }
      ],
      buttonText: "Access Priority Services"
    },
    {
      title: "Exclusive Events",
      description: "Access special opportunities",
      icon: Ticket,
      iconColor: "text-eduverse-accent",
      introText: "Redeem tokens for access to exclusive events, workshops, and networking opportunities.",
      items: [
        { name: "Industry Speaker Series", cost: "250 points" },
        { name: "Alumni Networking Event", cost: "350 points" },
        { name: "Leadership Workshop", cost: "200 points" }
      ],
      buttonText: "Browse Exclusive Events"
    },
    {
      title: "Scholarship Opportunities",
      description: "Convert points to financial aid",
      icon: DollarSign,
      iconColor: "text-green-600",
      introText: "High achievers can convert tokens to scholarship opportunities and tuition discounts.",
      items: [
        { name: "Tuition Credit (5%)", cost: "2,000 points" },
        { name: "Book Scholarship", cost: "1,500 points" },
        { name: "Research Stipend", cost: "3,000 points" }
      ],
      buttonText: "Explore Scholarship Options"
    },
    {
      title: "Token Staking",
      description: "Earn passive rewards",
      icon: Wallet,
      iconColor: "text-purple-600",
      introText: "Stake your tokens to earn passive rewards and boost your token holdings over time.",
      items: [
        { name: "1 Month Staking (5% APY)", cost: "Min. 500 points" },
        { name: "3 Month Staking (10% APY)", cost: "Min. 1,000 points" },
        { name: "Academic Year (15% APY)", cost: "Min. 2,000 points" }
      ],
      buttonText: "Start Staking"
    },
    {
      title: "NFT Rewards",
      description: "Collectible digital rewards",
      icon: Gift,
      iconColor: "text-orange-600",
      introText: "Redeem tokens for limited edition NFTs that commemorate your achievements and carry special benefits.",
      items: [
        { name: "Dean's List Badge", cost: "500 points" },
        { name: "Campus Landmark Collection", cost: "300 points each" },
        { name: "Graduation Commemorative", cost: "1,000 points" }
      ],
      buttonText: "Browse NFT Rewards"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Token Utility</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the many ways to use your earned EduPoints across campus and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {utilityCards.map((card, index) => (
            <TokenUtilityCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              iconColor={card.iconColor}
              introText={card.introText}
              items={card.items}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenUtilitySection;
