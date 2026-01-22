import firstBraid from "/public/stylists/img.png"
import secondBraid from "/public/stylists/img_2.png"
import thirdBraid from "/public/stylists/img_3.png"
import forthBraid from "/public/stylists/img_1.png"
import frontal1 from "/public/stylists/img_6.png"
import frontal2 from "/public/stylists/img_7.png"
import frontal3 from "/public/stylists/img_5.png"
import frontal4 from "/public/stylists/img_4.png"
import nail1 from "/public/stylists/img_8.png"
import nail2 from "/public/stylists/img_9.png"
import nail3 from "/public/stylists/img_10.png"
import nail4 from "/public/stylists/img_11.png"
import makeup1 from "/public/stylists/img_12.png"
import makeup2 from "/public/stylists/img_13.png"
import makeup3 from "/public/stylists/img_16.png"
import makeup4 from "/public/stylists/img_17.png"


import { Stylist, Service } from './types';

export const SERVICE_CATEGORIES = [
  { name: 'Twist Braid', icon: 'Knotless Braids' },
  { name: 'Makeup', icon: 'sparkles' },
  { name: 'Nails', icon: 'hand' },
  { name: 'Skincare', icon: 'face' },
  { name: 'Spa', icon: 'lotus' },
];

export const MOCK_SERVICES: Service[] = [
    { name: "Knotless Braids", price: 180, duration: 240 },
    { name: "Box Braids", price: 160, duration: 220 },
    { name: "Goddess Braids", price: 200, duration: 260 },
    { name: "Cornrows", price: 80, duration: 90 },
    { name: "Feed-In Braids", price: 120, duration: 150 },
];

export const DUMMY_STYLISTS: Stylist[] = [
  {
    id: '1',
    name: 'Braids',
    imageUrl: firstBraid,
    portfolioUrls: [
        firstBraid,
        secondBraid,
        thirdBraid,
        forthBraid,
    ],
    specialties: ['Twist Braid', 'Knotless Braids'],
    rating: 4.9,
    location: 'Downtown Studio',
    about: 'Ayomide is a braid specialist with over 10 years of experience creating stunning and long-lasting styles. She excels in box braids, goddess braids, and intricate designs, giving every client a flawless look.',
    services: MOCK_SERVICES,
    reviews: [
        { id: 'r1', author: 'Sarah K.', rating: 5, text: 'Elena is amazing! Best balayage I have ever had.', date: '2023-10-15' },
        { id: 'r2', author: 'Jenny L.', rating: 4, text: 'Great cut, slightly expensive but worth it.', date: '2023-09-22' }
    ]
  },
  {
    id: '2',
    name: 'Frontal',
    imageUrl: frontal4,
    portfolioUrls: [
        frontal1,
        frontal2,
        frontal3,
        frontal4
    ],
    specialties: ['Curly Frontal', 'Bob Wig'],
    rating: 4.8,
    location: 'Uptown Loft',
    about:  'Ayomide is an expert in frontal and closure styling. He brings precision and artistry to every install, ensuring natural-looking and flawless results for every client.',
    services: [
        { name: "Frontal Installation", price: 120, duration: 120 },
        { name: "Frontal Re-installation", price: 90, duration: 90 },
        { name: "Frontal Customization (Plucking & Styling)", price: 70, duration: 60 },
        { name: "Frontal Wig Revamp", price: 100, duration: 120 },
        { name: "Closure / Frontal Sew-In", price: 150, duration: 150 }
    ],
    reviews: [
        { id: 'r3', author: 'Mike T.', rating: 5, text: 'Sharpest fade in the city.', date: '2023-11-01' }
    ]
  },
  {
    id: '3',
    name: 'Nails',
    imageUrl: nail1,
    portfolioUrls: [
        nail2,
        nail3,
        nail4,
        nail1
    ],
    specialties: ['Acrylics Nails', 'Wild Card Nails'],
    rating: 5.0,
    location: 'Mobile / On-site',
    about: 'Ayomide is a talented nail artist, creating everything from simple manicures to intricate designs. She delivers flawless results and ensures your nails look perfect for any occasion.',
    services: [
        { name: "Manicure", price: 40, duration: 45 },
        { name: "Pedicure", price: 50, duration: 60 },
        { name: "Gel Nails", price: 70, duration: 75 },
        { name: "Acrylic Full Set", price: 100, duration: 120 },
        { name: "Acrylic Refill", price: 60, duration: 60 },
        { name: "Nail Art (per hand)", price: 30, duration: 45 },
        { name: "Bridal Nails", price: 150, duration: 120 },
        { name: "Spa Mani-Pedi", price: 90, duration: 90 }
    ],
    reviews: [
        { id: 'r4', author: 'Emily W.', rating: 5, text: 'Made me feel so beautiful on my big day!', date: '2023-08-12' }
    ]
  },
  {
    id: '4',
    name: 'MakeUp',
    imageUrl: makeup1,
    portfolioUrls: [
        makeup1,
        makeup2,
        makeup3,
        makeup4
    ],
    specialties: ['Gele', 'Makup'],
    rating: 4.7,
    location: 'Polished Lounge',
    about: 'Ayomide is a talented makeup artist and gele stylist. She creates flawless looks for bridal, events, and everyday glam, combining creativity with precision.',
    services: [
        // Gele
        { name: "Gele Wrapping", price: 40, duration: 30 },
        { name: "Gele + Outfit Styling", price: 70, duration: 45 },

        // Makeup
        { name: "Bridal Makeup", price: 150, duration: 120 },
        { name: "Event / Party Makeup", price: 120, duration: 90 },
        { name: "Makeup Trial Session", price: 80, duration: 60 },
        { name: "Makeup Lesson / Tutorial", price: 200, duration: 120 },
    ],
    reviews: []
  },
];
