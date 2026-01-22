import React from 'react';
import { Stylist, Screen } from '../types';
import { StarIcon, ChevronLeftIcon } from './Icons';

interface StylistProfileScreenProps {
  stylist: Stylist;
  onBack: () => void;
  onBookService: (stylist: Stylist, serviceName: string, price: number) => void;
}

const StylistProfileScreen: React.FC<StylistProfileScreenProps> = ({ stylist, onBack, onBookService }) => {
  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header Image */}
      <div className="relative h-64 w-full">
        <img src={stylist.imageUrl} alt={stylist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition">
           <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow -mt-6 relative bg-white rounded-t-3xl px-6 pt-8 overflow-y-auto shadow-lg">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{stylist.name}</h1>
                <p className="text-sm text-gray-500">{stylist.location}</p>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center bg-brand-pink-50 px-2 py-1 rounded-lg">
                    <StarIcon className="w-4 h-4 text-brand-pink-500 mr-1" />
                    <span className="font-bold text-brand-pink-700">{stylist.rating}</span>
                </div>
                <span className="text-xs text-gray-400 mt-1">{stylist.reviews.length} reviews</span>
            </div>
        </div>

        {/* Tabs (Simplified) */}
        <div className="flex border-b border-gray-100 mb-6">
            <button className="pb-2 border-b-2 border-brand-pink-500 text-brand-pink-600 font-medium text-sm px-4">Services</button>
            <button className="pb-2 border-b-2 border-transparent text-gray-400 font-medium text-sm px-4">About</button>
            <button className="pb-2 border-b-2 border-transparent text-gray-400 font-medium text-sm px-4">Reviews</button>
        </div>

        <div className="space-y-4 pb-8">
            <h3 className="font-bold text-gray-800">Select a Service</h3>
            {stylist.services.map((service, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:border-brand-pink-200 transition shadow-sm">
                    <div>
                        <h4 className="font-semibold text-gray-800">{service.name}</h4>
                        <p className="text-xs text-gray-500">{service.duration} mins</p>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold text-gray-900 mr-4">${service.price}</span>
                        <button 
                            onClick={() => onBookService(stylist, service.name, service.price)}
                            className="bg-brand-pink-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-brand-pink-600 transition"
                        >
                            Book
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mb-8">
             <h3 className="font-bold text-gray-800 mb-2">About {stylist.name.split(' ')[0]}</h3>
             <p className="text-sm text-gray-600 leading-relaxed">{stylist.about}</p>
        </div>
      </div>
    </div>
  );
};

export default StylistProfileScreen;
