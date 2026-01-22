import React from 'react';
import { Stylist, Screen } from '../types';
import BottomNav from './BottomNav';
import { StarIcon } from './Icons';

interface FavoritesScreenProps {
  favorites: Stylist[];
  navigateTo: (screen: Screen) => void;
  currentScreen: Screen;
  onSelectStylist: (stylist: Stylist) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favorites, navigateTo, currentScreen, onSelectStylist }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
        <header className="bg-white p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Favorites</h1>
        </header>

        <div className="flex-grow p-6 overflow-y-auto">
            {favorites.length === 0 ? (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                    <p>No favorites yet.</p>
                    <button onClick={() => navigateTo(Screen.HOME)} className="mt-4 text-brand-pink-500 font-semibold">Browse Stylists</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {favorites.map(stylist => (
                        <div key={stylist.id} onClick={() => onSelectStylist(stylist)} className="bg-white p-3 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition">
                            <img src={stylist.imageUrl} alt={stylist.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                            <h3 className="font-bold text-gray-800 text-sm truncate">{stylist.name}</h3>
                            <div className="flex items-center mt-1">
                                <StarIcon className="w-3 h-3 text-yellow-400 mr-1"/>
                                <span className="text-xs text-gray-500">{stylist.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
    </div>
  );
};

export default FavoritesScreen;
