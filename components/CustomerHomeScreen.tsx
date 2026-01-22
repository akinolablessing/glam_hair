
import React, { useState, useEffect } from 'react';
import { Stylist, Screen } from '../types';
import { DUMMY_STYLISTS, SERVICE_CATEGORIES } from '../constants';
import { StarIcon, SparklesIcon } from './Icons';
import StyleIdeaGenerator from './StyleIdeaGenerator';
import BottomNav from './BottomNav';

interface CustomerHomeScreenProps {
  userName: string;
  onSelectStylist: (stylist: Stylist) => void;
  navigateTo: (screen: Screen) => void;
  currentScreen: Screen;
  onLogout: () => void;
}

const StylistCard = ({ stylist, onClick }: { stylist: Stylist, onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycle images every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stylist.portfolioUrls.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [stylist.portfolioUrls.length]);

  return (
    <div onClick={onClick} className="flex-shrink-0 w-44 cursor-pointer group">
      <div className="relative mb-3 h-48 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
        {/* Render all images stacked, fade them in/out via opacity */}
        {stylist.portfolioUrls.map((url, index) => (
           <img 
              key={index}
              src={url} 
              alt={stylist.name} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
           />
        ))}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-gray-800 flex items-center shadow-sm z-10">
          <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
          {stylist.rating}
        </div>
      </div>
      <h3 className="font-bold text-gray-800 truncate">{stylist.name}</h3>
      <p className="text-xs text-gray-500 truncate">{stylist.specialties.join(', ')}</p>
    </div>
  );
};

const CustomerHomeScreen: React.FC<CustomerHomeScreenProps> = ({ userName, onSelectStylist, navigateTo, currentScreen, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStylists = DUMMY_STYLISTS.filter(stylist => 
    stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stylist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col bg-white">
       <header className="pt-6 pb-4 px-6 flex justify-between items-center bg-white sticky top-0 z-10">
        <div>
          <p className="text-sm text-gray-400 font-medium">Welcome back,</p>
          <h1 className="text-2xl font-extrabold text-gray-800">{userName}</h1>
        </div>
        <button 
            onClick={onLogout}
            className="text-sm font-medium text-brand-pink-500 hover:text-brand-pink-700 transition px-3 py-1 rounded-lg hover:bg-brand-pink-50"
        >
            Logout
        </button>
      </header>

      <div className="flex-grow px-6 pb-6 overflow-y-auto no-scrollbar">
        <div className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Find stylists, services..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-pink-200 focus:bg-white transition-all shadow-sm text-sm placeholder-gray-400"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <StyleIdeaGenerator />

        {/* Featured Stylists */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Top Rated Stylists</h2>
            <button className="text-xs text-brand-pink-500 font-semibold">See All</button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {filteredStylists.map((stylist) => (
              <StylistCard 
                key={stylist.id} 
                stylist={stylist} 
                onClick={() => onSelectStylist(stylist)} 
              />
            ))}
            {filteredStylists.length === 0 && (
                <div className="text-gray-400 text-sm py-4 italic">No stylists found matching "{searchTerm}"</div>
            )}
          </div>
        </div>

        {/* Service Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Explore Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                 <div className="w-14 h-14 bg-brand-pink-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-brand-pink-100 group-active:scale-95 duration-200">
                    <SparklesIcon className="w-6 h-6 text-brand-pink-500"/>
                 </div>
                <p className="text-[10px] font-semibold text-gray-600 text-center">{cat.name}</p>
              </div>
            ))}
             <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-gray-100 group-active:scale-95 duration-200">
                    <span className="text-gray-400 font-bold text-xl">•••</span>
                </div>
                <p className="text-[10px] font-semibold text-gray-600 text-center">More</p>
             </div>
          </div>
        </div>
      </div>
      
      <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
    </div>
  );
};

export default CustomerHomeScreen;
