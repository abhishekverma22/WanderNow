import {
  Plane,
  Heart,
  Home,
  Users,
  WalletMinimal,
  CreditCard,
  Diamond,
} from "lucide-react";

export const SelectTravelsList = [
  {
    id: 1,
    title: "Solo",
    desc: "A solo traveler seeking new adventures.",
    icon: <Plane className="w-6 h-6 text-blue-500" />,
    people: "1 Person",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two travelers exploring together.",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A family ready to create unforgettable memories.",
    icon: <Home className="w-6 h-6 text-green-500" />,
    people: "Family 3 or 6 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of friends chasing adventures and good vibes together.",
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    people: "Friends 3 or 10 people",
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Travel smart, enjoy adventures, keep costs low.",
    icon: <WalletMinimal className="w-6 h-6 text-amber-500" />,
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Enjoy a balanced travel experience within your budget.",
    icon: <CreditCard className="w-6 h-6 text-sky-500" />,
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Experience ultimate premium comfort without limits.",
    icon: <Diamond className="w-6 h-6 text-purple-500" />,
  },
];




 export const AI_PROMPT = `Genrate travel plan for location : City is {city}, Country is {country}, destination place is {destination} , {numberOfDays} days for {traveler} with {budget} budget, Give me hotels options list with HotelName, Hotel address price, hotel image url geo coordinates, rating descriptions and suggest itinery with placename, place destils place image url geo cordinates and ticket price , time travel each of the location for 3 days  plan with best time  to visit in JSON formate`