import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, navigateTo }) => {
  const navItems = [
    { screen: Screen.HOME, label: 'Home', iconPath: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z", filled: true },
    { screen: Screen.BOOKINGS_LIST, label: 'Bookings', iconPath: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", filled: false },
    { screen: Screen.FAVORITES, label: 'Favorites', iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", filled: false },
    { screen: Screen.PROFILE, label: 'Profile', iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", filled: false },
  ];

  return (
    <nav className="border-t border-gray-200 p-2 flex justify-around bg-white">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <button
            key={item.label}
            onClick={() => navigateTo(item.screen)}
            className={`flex flex-col items-center p-2 transition-colors ${isActive ? 'text-brand-pink-500' : 'text-gray-400 hover:text-brand-pink-400'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill={isActive && item.filled ? "currentColor" : "none"}
              stroke={isActive && item.filled ? "none" : "currentColor"}
              strokeWidth={isActive && item.filled ? 0 : 2}
            >
                {/* Handle paths that expect viewbox 20 20 differently or just use standard 24 24 paths.
                    For simplicity, I'm assuming paths are compatible or normalizing nicely.
                    Let's use standard 24x24 paths for consistency.
                 */}
                 {item.label === 'Home' ? (
                     <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
                 ) : (
                     <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                 )}
            </svg>
            <span className={`text-xs mt-1 ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
