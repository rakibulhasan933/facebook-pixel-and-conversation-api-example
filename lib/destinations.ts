export interface Destination {
  id: string
  name: string
  region: string
  description: string
  fullDescription: string
  duration: string
  rating: number
  price: number
  highlights: string[]
  bestTimeToVisit: string
  timezone: string
}

export const destinations: Destination[] = [
  {
    id: "bali-indonesia",
    name: "Bali, Indonesia",
    region: "Southeast Asia",
    description: "Tropical paradise with rich culture, stunning beaches, and ancient temples",
    fullDescription:
      "Experience the magic of Bali with its lush rice terraces, ancient temples, and vibrant culture. From the spiritual heart of Ubud to the pristine beaches of Seminyak, Bali offers unforgettable experiences for every traveler.",
    duration: "7-10 days",
    rating: 4.8,
    price: 1299,
    highlights: ["Temple exploration", "Beach relaxation", "Rice terraces", "Surfing", "Yoga retreats", "Local cuisine"],
    bestTimeToVisit: "April to October",
    timezone: "WIB",
  },
  {
    id: "paris-france",
    name: "Paris, France",
    region: "Europe",
    description: "The City of Love and Lights with iconic landmarks and world-class cuisine",
    fullDescription:
      "Discover the romance and elegance of Paris. Walk along the Seine, explore the Louvre, climb the Eiffel Tower, and indulge in exquisite French cuisine. Every corner of this magical city tells a story.",
    duration: "5-7 days",
    rating: 4.9,
    price: 1599,
    highlights: ["Eiffel Tower", "Louvre Museum", "Parisian cafes", "Seine cruises", "Art galleries", "Fine dining"],
    bestTimeToVisit: "April to May, September to October",
    timezone: "CET",
  },
  {
    id: "tokyo-japan",
    name: "Tokyo, Japan",
    region: "East Asia",
    description: "Where modern technology meets traditional culture in a vibrant metropolis",
    fullDescription:
      "Experience the perfect blend of ancient traditions and cutting-edge modernity in Tokyo. From serene temples and traditional gardens to bustling markets and high-tech innovations, Tokyo is a city of endless discoveries.",
    duration: "6-8 days",
    rating: 4.7,
    price: 1399,
    highlights: ["Temples and shrines", "Modern architecture", "Local markets", "Anime culture", "Traditional tea ceremony", "Mt. Fuji views"],
    bestTimeToVisit: "March to April, October to November",
    timezone: "JST",
  },
  {
    id: "iceland-reykjavik",
    name: "Reykjavik, Iceland",
    region: "North Atlantic",
    description: "Land of fire and ice with dramatic waterfalls and geothermal wonders",
    fullDescription:
      "Explore Iceland's otherworldly landscapes. Witness the Northern Lights, relax in geothermal hot springs, trek past waterfalls, and explore glaciers. An adventure destination for nature lovers.",
    duration: "5-7 days",
    rating: 4.8,
    price: 1699,
    highlights: ["Northern Lights", "Blue Lagoon", "Geysers", "Waterfalls", "Glacier hiking", "Black sand beaches"],
    bestTimeToVisit: "September to March (Aurora), June to August (midnight sun)",
    timezone: "GMT",
  },
  {
    id: "newyork-usa",
    name: "New York, USA",
    region: "North America",
    description: "The city that never sleeps with world-class attractions and diverse culture",
    fullDescription:
      "Experience the energy and excitement of New York City. Explore iconic landmarks like the Statue of Liberty and Times Square, enjoy world-class museums, catch Broadway shows, and eat at diverse restaurants.",
    duration: "5-7 days",
    rating: 4.6,
    price: 1199,
    highlights: ["Statue of Liberty", "Times Square", "Broadway", "Central Park", "Museums", "Rooftop bars"],
    bestTimeToVisit: "May to June, September to October",
    timezone: "EST",
  },
  {
    id: "dubai-uae",
    name: "Dubai, UAE",
    region: "Middle East",
    description: "Ultramodern desert city with luxury shopping and stunning architecture",
    fullDescription:
      "Experience luxury and innovation in Dubai. Discover the world's tallest building, enjoy pristine beaches, shop at world-class malls, and enjoy desert adventures. A city where dreams become reality.",
    duration: "4-6 days",
    rating: 4.5,
    price: 1449,
    highlights: ["Burj Khalifa", "Palm Islands", "Desert safari", "Luxury shopping", "Beaches", "Modern architecture"],
    bestTimeToVisit: "November to March",
    timezone: "GST",
  },
]
