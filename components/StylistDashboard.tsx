import React, { useState } from 'react';
import { PlusIcon, TrashIcon, ClockIcon, CurrencyDollarIcon } from './Icons';
import {Booking} from "@/types.ts";

// interface StylistDashboardProps {
//   userName: string;
//   onLogout: () => void;
// }

interface StylistDashboardProps {
    userName: string;
    stylistId: string;
    bookings: Booking[];
    onLogout: () => void;
}


interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface DayAvailability {
  day: string;
  active: boolean;
  start: string;
  end: string;
}

const StylistDashboard: React.FC<StylistDashboardProps> = ({ userName,stylistId, onLogout }) => {


    const bookings = [
        { id: 1, stylistId: '123', service: 'Classic Haircut', client: 'Amy Smith', time: 'Today, 2:00 PM', location: '123 Blossom Lane', status: 'upcoming' },
        { id: 2, stylistId: '123', service: 'Full Color', client: 'Jessica Wu', time: 'Tomorrow, 10:00 AM', location: '456 Style Avenue', status: 'upcoming' }
    ];


    const stylistBookings = bookings.filter(
        booking =>
            booking.stylistId === stylistId &&
            booking.status === 'upcoming'
    );



    const [activeTab, setActiveTab] = useState('Bookings');


  const tabs = ['Bookings', 'Earnings', 'Services', 'Availability'];

  // Mock Data: Bookings


  // State: Services
  const [services, setServices] = useState<ServiceItem[]>([
    { id: '1', name: 'Classic Haircut', price: 85, duration: 60 },
    { id: '2', name: 'Balayage', price: 200, duration: 180 },
  ]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({ name: '', price: '', duration: '' });

  // State: Availability
  const [availability, setAvailability] = useState<DayAvailability[]>([
    { day: 'Mon', active: true, start: '09:00', end: '17:00' },
    { day: 'Tue', active: true, start: '09:00', end: '17:00' },
    { day: 'Wed', active: true, start: '09:00', end: '17:00' },
    { day: 'Thu', active: true, start: '09:00', end: '17:00' },
    { day: 'Fri', active: true, start: '09:00', end: '16:00' },
    { day: 'Sat', active: false, start: '10:00', end: '14:00' },
    { day: 'Sun', active: false, start: '10:00', end: '14:00' },
  ]);

  // --- Handlers ---

  const handleAddService = () => {
    if (newService.name && newService.price && newService.duration) {
      const service: ServiceItem = {
        id: Date.now().toString(),
        name: newService.name,
        price: parseFloat(newService.price),
        duration: parseInt(newService.duration),
      };
      setServices([...services, service]);
      setNewService({ name: '', price: '', duration: '' });
      setIsAddingService(false);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const toggleAvailability = (index: number) => {
    const newAvail = [...availability];
    newAvail[index].active = !newAvail[index].active;
    setAvailability(newAvail);
  };

  const updateTime = (index: number, field: 'start' | 'end', value: string) => {
    const newAvail = [...availability];
    newAvail[index] = { ...newAvail[index], [field]: value };
    setAvailability(newAvail);
  };

  // --- Renderers ---

  const renderBookings = () => (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {bookings.map(booking => (
        <div key={booking.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
             <div className="flex items-center mb-1">
                <h3 className="font-bold text-gray-800 mr-2">{booking.service}</h3>
             </div>
             <p className="text-sm text-gray-500">with <span className="text-gray-700 font-medium">{booking.client}</span></p>
             <p className="text-xs text-gray-400 mt-1">{booking.location}</p>
          </div>
           <div className="text-right">
             <span className="text-purple-700 font-bold text-xs bg-purple-50 px-2 py-1 rounded-md">{booking.time}</span>
           </div>
        </div>
      ))}
      {bookings.length === 0 && <p className="text-center text-gray-400 mt-8">No upcoming bookings.</p>}
    </div>
  );

  const renderEarnings = () => {
    const weeklyData = [40, 70, 30, 85, 60, 20, 10]; // Mock percentages
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                 <p className="text-purple-200 text-sm font-medium mb-1">Total Earnings</p>
                 <h2 className="text-4xl font-bold mb-4">$2,450.00</h2>
                 <div className="flex justify-between items-center text-xs opacity-80 border-t border-white/20 pt-3">
                    <span>Pending: $120.00</span>
                    <span>Available: $2,330.00</span>
                 </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Weekly Revenue</h3>
                <div className="flex justify-between items-end h-32 px-2">
                    {weeklyData.map((height, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-8">
                            <div 
                                className={`w-full rounded-t-lg transition-all duration-500 ${i === 4 ? 'bg-purple-600' : 'bg-purple-100'}`} 
                                style={{ height: `${height}%` }}
                            ></div>
                            <span className="text-xs text-gray-400 font-medium">{days[i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 px-1">Recent Payouts</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-3">
                                <CurrencyDollarIcon className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">Weekly Payout</p>
                                <p className="text-xs text-gray-400">Oct 24, 2023</p>
                            </div>
                        </div>
                        <span className="font-bold text-gray-800">+$840.00</span>
                    </div>
                     <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center">
                             <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-3">
                                <ClockIcon className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 text-sm">Tip Received</p>
                                <p className="text-xs text-gray-400">Oct 22, 2023</p>
                            </div>
                        </div>
                        <span className="font-bold text-gray-800">+$15.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderServices = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {!isAddingService ? (
             <button 
                onClick={() => setIsAddingService(true)}
                className="w-full py-3 border-2 border-dashed border-purple-200 rounded-xl text-purple-600 font-bold flex items-center justify-center hover:bg-purple-50 transition"
            >
                <PlusIcon className="w-5 h-5 mr-2" /> Add New Service
            </button>
        ) : (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-100 space-y-3">
                <h3 className="font-bold text-gray-800">New Service</h3>
                <input 
                    type="text" 
                    placeholder="Service Name (e.g. Gel Nails)" 
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-400"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-2 text-gray-400 text-sm">$</span>
                        <input 
                            type="number" 
                            placeholder="Price" 
                            className="w-full pl-6 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-400"
                            value={newService.price}
                            onChange={(e) => setNewService({...newService, price: e.target.value})}
                        />
                    </div>
                    <div className="relative flex-1">
                        <input 
                            type="number" 
                            placeholder="Mins" 
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-purple-400"
                            value={newService.duration}
                            onChange={(e) => setNewService({...newService, duration: e.target.value})}
                        />
                         <span className="absolute right-3 top-2 text-gray-400 text-xs">min</span>
                    </div>
                </div>
                <div className="flex gap-2 pt-2">
                    <button onClick={handleAddService} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-purple-700">Save</button>
                    <button onClick={() => setIsAddingService(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold text-sm hover:bg-gray-200">Cancel</button>
                </div>
            </div>
        )}

        {services.map(service => (
            <div key={service.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-800">{service.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                        <ClockIcon className="w-3 h-3 mr-1" /> {service.duration} mins
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-900">${service.price}</span>
                    <button onClick={() => handleDeleteService(service.id)} className="text-gray-400 hover:text-red-500">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))}
    </div>
  );

  const renderAvailability = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {availability.map((day, index) => (
            <div key={day.day} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={day.active}
                            onChange={() => toggleAvailability(index)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                    <span className={`font-medium ${day.active ? 'text-gray-800' : 'text-gray-400'}`}>{day.day}</span>
                </div>
                
                {day.active ? (
                    <div className="flex items-center gap-2">
                        <input 
                            type="text" 
                            value={day.start} 
                            onChange={(e) => updateTime(index, 'start', e.target.value)}
                            className="w-14 text-center text-sm bg-gray-50 border border-gray-200 rounded py-1 focus:outline-none focus:border-purple-400"
                        />
                        <span className="text-gray-400 text-xs">to</span>
                        <input 
                            type="text" 
                            value={day.end} 
                            onChange={(e) => updateTime(index, 'end', e.target.value)}
                            className="w-14 text-center text-sm bg-gray-50 border border-gray-200 rounded py-1 focus:outline-none focus:border-purple-400"
                        />
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 italic px-4">Unavailable</span>
                )}
            </div>
        ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-6 pb-0 shadow-sm z-10">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {userName}!</p>
            </div>
            <button onClick={onLogout} className="text-xs text-gray-500 hover:text-gray-800 mt-1">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 mt-6 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                        activeTab === tab ? 'text-purple-700' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-700 rounded-t-full"></span>
                    )}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {activeTab === 'Bookings' && renderBookings()}
        {activeTab === 'Earnings' && renderEarnings()}
        {activeTab === 'Services' && renderServices()}
        {activeTab === 'Availability' && renderAvailability()}
      </div>
    </div>
  );
};

export default StylistDashboard;