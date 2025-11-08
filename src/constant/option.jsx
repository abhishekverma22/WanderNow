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
export const AI_PROMPT = `
You are an assistant that outputs **only valid JSON**.
Do not add any explanations or extra text.
Generate a travel plan with the following details:

City: {city}
Country: {country}
Destination place: {destination}
Number of days: {numberOfDays}
Traveler type: {traveler}
Budget: {budget}

Requirements:
1. Provide hotels options list with:
   - HotelName
   - HotelAddress
   - Price
   - HotelImageURL (realistic direct image URL from Google or Google Maps)
   - GeoCoordinates
   - Rating
   - Descriptions
2. Suggest itinerary for each day including:
   - PlaceName
   - PlaceDetails
   - PlaceImageURL (realistic direct image URL)
   - GeoCoordinates
   - TicketPrice
   - TimeToSpend
   - BestTimeToVisit
3. Ensure all JSON syntax is valid and consistent.
4. Provide realistic coordinates, prices, and ratings.
5. Avoid placeholder images or fake URLs.
6. No explanations, only return JSON.

Example JSON structure to follow:

{
  "location": "string",
  "duration_days": "number",
  "travelers": "string",
  "hotels": [
    {
      "hotel_name": "string",
      "hotel_address": "string",
      "price": "string",
      "hotel_image_url": "string",
      "geo_coordinates": "string",
      "rating": "string",
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": "number",
      "theme": "string",
      "plan": [
        {
          "place_name": "string",
          "place_details": "string",
          "ticket_price_inr": "string",
          "time_to_spend": "string",
          "best_time_to_visit": "string",
          "place_image_url": "string"
        }
      ]
    }
  ]
}
`;
