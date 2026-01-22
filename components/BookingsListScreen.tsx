import React from 'react';
import { Booking, Screen } from '../types';
import BottomNav from './BottomNav';
import { CalendarIcon } from './Icons';

interface BookingsListScreenProps {
  bookings: Booking[];
  navigateTo: (screen: Screen) => void;
  currentScreen: Screen;
}

const BookingsListScreen: React.FC<BookingsListScreenProps> = ({ bookings, navigateTo, currentScreen }) => {
  
  const upcoming = bookings.filter(b => b.status === 'upcoming');
  const past = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="bg-white p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
      </header>

      <div className="flex-grow p-6 overflow-y-auto">
        {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <CalendarIcon className="w-8 h-8 text-gray-300" />
                </div>
                <p>No bookings yet.</p>
                <button onClick={() => navigateTo(Screen.HOME)} className="mt-4 text-brand-pink-500 font-semibold">Find a Stylist</button>
            </div>
        ) : (
            <div className="space-y-6">
                {upcoming.length > 0 && (
                    <div>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming</h2>
                        <div className="space-y-4">
                            {upcoming.map(booking => (
                                <div key={booking.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-brand-pink-500 flex gap-4">
                                    <img src={booking.stylistImage} className="w-16 h-16 rounded-xl object-cover bg-gray-200" alt="" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-800">{booking.serviceName}</h3>
                                            <span className="bg-brand-pink-100 text-brand-pink-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase">{booking.status}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{booking.stylistName}</p>
                                        <div className="mt-2 flex items-center text-xs text-gray-500">
                                            <CalendarIcon className="w-3 h-3 mr-1"/>
                                            {booking.date.toLocaleDateString()} at {booking.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {past.length > 0 && (
                     <div>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">History</h2>
                         <div className="space-y-4">
                            {past.map(booking => (
                                <div key={booking.id} className="bg-white p-4 rounded-2xl shadow-sm opacity-70">
                                    <div className="flex gap-4">
                                        <img src={booking.stylistImage} className="w-16 h-16 rounded-xl object-cover bg-gray-200 grayscale" alt="" />
                                        <div>
                                            <h3 className="font-bold text-gray-800">{booking.serviceName}</h3>
                                            <p className="text-sm text-gray-600">{booking.stylistName}</p>
                                             <p className="text-xs text-gray-400 mt-1">{booking.date.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                )}
            </div>
        )}
      </div>
      
      <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
    </div>
  );
};

export default BookingsListScreen;
