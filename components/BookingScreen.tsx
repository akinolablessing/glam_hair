import React, { useState } from 'react';
import { Stylist, Screen } from '../types';
import { ChevronLeftIcon, CalendarIcon } from './Icons';

interface BookingScreenProps {
  stylist: Stylist;
  serviceName: string;
  servicePrice: number;
  onBack: () => void;
  onConfirmBooking: (date: Date, time: string) => void;
}

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:30 PM', 
  '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'
];

const BookingScreen: React.FC<BookingScreenProps> = ({ stylist, serviceName, servicePrice, onBack, onConfirmBooking }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

    type ConfirmationMessage = {
        title: string;
        message: string;
    };

    const [confirmationMessage, setConfirmationMessage] =
        useState<ConfirmationMessage | null>(null);



    // Generate next 14 days for calendar
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }

    // const handleBook = () => {
    //     if (selectedDate && selectedTime) {
    //         // Save booking in App.tsx
    //         onConfirmBooking(selectedDate, selectedTime);
    //
    //         // Show message
    //         setConfirmationMessage(
    //             `Booking confirmed with ${stylist.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime}!`
    //         );
    //
    //         // Optional: auto-hide after 3s
    //         setTimeout(() => setConfirmationMessage(null), 3000);
    //     }
    // };

    //
    // const handleBook = () => {
    //     if (selectedDate && selectedTime) {
    //         onConfirmBooking(selectedDate, selectedTime);
    //
    //         setConfirmationMessage({
    //             title: 'Booking Confirmed!',
    //             message: `Your appointment with ${stylist.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime} is confirmed.`
    //         });
    //     }
    // };

    const handleBook = () => {
        if (selectedDate && selectedTime) {
            setConfirmationMessage({
                title: 'Booking Confirmed!',
                message: `Your appointment with ${stylist.name} on ${selectedDate.toLocaleDateString()} at ${selectedTime} is confirmed.`
            });
        }
    };


    return (
    <div className="h-full flex flex-col bg-gray-50">


        {confirmationMessage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative text-center">
                    {/* Optional Close Button */}
                    <button
                        onClick={() => setConfirmationMessage(null)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold"
                    >
                        ×
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="bg-brand-pink-400 w-12 h-12 flex items-center justify-center rounded-full">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.5-5.5 1.4-1.4L10 12.2l4.6-4.6 1.4 1.4L10 15z" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-2">{confirmationMessage.title || 'Booking Confirmed!'}</h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4">
                        {confirmationMessage.message || confirmationMessage}
                    </p>

                    {/* Button */}
                    <button
                        onClick={() => {
                            onConfirmBooking(selectedDate!, selectedTime!);
                            setConfirmationMessage(null);
                        }}

                        className="bg-brand-pink-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-pink-600 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        )}


        <header className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 mr-4">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div>
            <h1 className="text-lg font-bold text-gray-800">Book Appointment</h1>
            <p className="text-xs text-gray-500">{stylist.name} • {serviceName}</p>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        
        {/* Calendar Strip */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-brand-pink-500"/>
            Select Date
          </h2>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {dates.map((date, i) => {
                const isSelected = selectedDate?.toDateString() === date.toDateString();
                return (
                    <button 
                        key={i} 
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 w-14 h-20 flex flex-col items-center justify-center rounded-xl border transition-all duration-200 ${
                            isSelected 
                            ? 'bg-brand-pink-500 border-brand-pink-600 text-white shadow-lg scale-105' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-pink-300'
                        }`}
                    >
                        <span className="text-xs font-medium opacity-80">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{date.getDate()}</span>
                    </button>
                )
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">Available Times</h2>
            {!selectedDate ? (
                <p className="text-sm text-gray-400 italic text-center py-4">Please select a date first</p>
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-1 rounded-lg text-sm font-medium border transition-colors ${
                                    isSelected
                                    ? 'bg-brand-pink-50 border-brand-pink-500 text-brand-pink-700'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                            >
                                {time}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>

        {/* Summary */}
        <div className="bg-brand-pink-50 p-4 rounded-2xl border border-brand-pink-100">
            <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-600">Service Total</span>
                <span className="font-bold text-gray-800">${servicePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Deposit Due</span>
                <span className="font-bold text-gray-800">$20.00</span>
            </div>
            <div className="mt-3 pt-3 border-t border-brand-pink-200 text-xs text-brand-pink-600 text-center">
                Free cancellation up to 24h before appointment.
            </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button 
            onClick={handleBook}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-brand-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        >
            Confirm Booking
        </button>
      </div>


    </div>
  );
};

export default BookingScreen;