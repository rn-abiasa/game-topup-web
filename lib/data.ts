export interface Product {
  id: string;
  name: string;
  publisher: string;
  image: string;
  banner: string;
  description: string;
}

export interface GameItem {
  id: string;
  name: string;
  price: number;
}

export const games: Product[] = [
  {
    id: "free-fire",
    name: "Free Fire",
    publisher: "Garena",
    image: "/ff.jpg",
    banner: "/banner1.jpg",
    description: "Top up Diamond Free Fire harga paling murah, aman, dan proses cepat."
  },
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    publisher: "Moonton",
    image: "/ml.jpg",
    banner: "/banner2.png",
    description: "Top up Diamond Mobile Legends murah dan cepat."
  },
  {
    id: "aov",
    name: "Arena of Valor",
    publisher: "Garena",
    image: "/aov.jpg",
    banner: "/banner1.jpg",
    description: "Top up Voucher AOV murah."
  },
  {
    id: "genshin-impact",
    name: "Genshin Impact",
    publisher: "HoYoverse",
    image: "/genshin.jpg",
    banner: "/banner2.png",
    description: "Top up Genesis Crystal Genshin Impact aman dan legal."
  }
];

export const gameItems: GameItem[] = [
  { id: "item-1", name: "50 Diamonds", price: 15000 },
  { id: "item-2", name: "100 Diamonds", price: 29000 },
  { id: "item-3", name: "250 Diamonds", price: 72000 },
  { id: "item-4", name: "500 Diamonds", price: 140000 },
  { id: "item-5", name: "1000 Diamonds", price: 280000 },
  { id: "item-6", name: "2000 Diamonds", price: 550000 },
];
