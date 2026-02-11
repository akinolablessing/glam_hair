import React, {useState} from 'react';
import { Stylist, Screen } from '../types';
import { StarIcon, ChevronLeftIcon } from './Icons';

interface StylistProfileScreenProps {
  stylist: Stylist;
  onBack: () => void;
  onBookService: (stylist: Stylist, serviceName: string, price: number) => void;
}

const StylistProfileScreen: React.FC<StylistProfileScreenProps> = ({ stylist, onBack, onBookService }) => {

    const [activeTab, setActiveTab] =
        useState<'services' | 'about' | 'reviews'>('services');

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
            {/*<button*/}
            {/*    className="pb-2 border-b-2 border-brand-pink-500 text-brand-pink-600 font-medium text-sm px-4">Services</button>*/}
            {/*<button className="pb-2 border-b-2 border-transparent text-gray-400 font-medium text-sm px-4">About</button>*/}
            {/*<button className="pb-2 border-b-2 border-transparent text-gray-400 font-medium text-sm px-4">Reviews</button>*/}

            <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 py-2 font-semibold border-b-2 ${
                    activeTab === 'services'
                        ? 'border-brand-pink-500 text-brand-pink-500'
                        : 'border-transparent text-gray-400'
                }`}
            >
                Services
            </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex-1 py-2 font-semibold ${
                        activeTab === 'about'
                            ? 'border-b-2 border-brand-pink-500 text-brand-pink-500'
                            : 'text-gray-400'
                    }`}
                >
                    About
                </button>

                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-2 font-semibold ${
                        activeTab === 'reviews'
                            ? 'border-b-2 border-brand-pink-500 text-brand-pink-500'
                            : 'text-gray-400'
                    }`}
                >
                    Reviews
                </button>
        </div>

          {activeTab === 'services' && (
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
          )}

          {activeTab === 'about' && (
              <div className="space-y-6 pb-10">

                  {/* Bio */}
                  <div className="bg-pink-50 p-4 rounded-xl">
                      <p className="text-sm text-pink-600 leading-relaxed">
                          {stylist.bio}
                      </p>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-pink-200 p-4 rounded-xl shadow-sm shadow-pink-100">
                          <p className="text-xs text-pink-400 mb-1">Experience</p>
                          <p className="font-bold text-pink-800">
                              {stylist.experience} years
                          </p>
                      </div>

                      <div className="bg-white border border-pink-200 p-4 rounded-xl shadow-sm shadow-pink-100">
                          <p className="text-xs text-pink-400 mb-1">Specialties</p>
                          <p className="font-bold text-pink-800 text-sm">
                              {stylist.specialties.join(', ')}
                          </p>
                      </div>
                  </div>

                  {/* About */}
                  <div>
                      <h3 className="font-bold text-pink-900 mb-2">
                          About {stylist.name.split(' ')[0]}
                      </h3>
                      <p className="text-sm text-pink-600 leading-relaxed">
                          {stylist.about}
                      </p>
                  </div>

              </div>
          )}

          {/*{activeTab === 'reviews' && (*/}
          {/*    <div className="space-y-4">*/}
          {/*        {stylist.reviews.map((review) => (*/}
          {/*            <div key={review.id} className="bg-gray-50 p-3 rounded-xl">*/}
          {/*                <div className="flex justify-between items-center mb-1">*/}
          {/*                    <p className="font-semibold text-sm">{review.user}</p>*/}
          {/*                    <div className="flex items-center">*/}
          {/*                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />*/}
          {/*                        <span className="text-xs">{review.rating}</span>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*                <p className="text-xs text-gray-600">{review.comment}</p>*/}
          {/*            </div>*/}
          {/*        ))}*/}
          {/*    </div>*/}
          {/*)}*/}

          {activeTab === 'reviews' && (
              <div className="space-y-4">
                  {stylist.reviews.map((review) => (
                      <div
                          key={review.id}
                          className="bg-pink-50 p-3 rounded-xl border border-pink-100 shadow-sm shadow-pink-100"
                      >
                          <div className="flex justify-between items-center mb-1">
                              <p className="font-semibold text-sm text-pink-800">{review.user}</p>
                              <div className="flex items-center">
                                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-xs text-pink-600">{review.rating}</span>
                              </div>
                          </div>
                          <p className="text-xs text-pink-600">{review.comment}</p>
                      </div>
                  ))}
              </div>
          )}

        {/*<div className="mb-8">*/}
        {/*     <h3 className="font-bold text-gray-800 mb-2">About {stylist.name.split(' ')[0]}</h3>*/}
        {/*     <p className="text-sm text-gray-600 leading-relaxed">{stylist.about}</p>*/}
        {/*</div>*/}

      </div>
    </div>
  );
};

export default StylistProfileScreen;
