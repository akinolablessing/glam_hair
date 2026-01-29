
import React, {useState} from 'react';
import { ChevronLeftIcon } from './Icons';
import {User} from "@/types.ts";

interface SubScreenProps {
  onBack: () => void;
}

interface AccountSettingsProps {
    user: User;
    onUpdateUser: (updates: Partial<User>) => void;
    onBack: () => void;
}


export const AccountSettingsScreen: React.FC<SubScreenProps> = ({ user,onUpdateUser,onBack }) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!profile.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!profile.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!profile.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }

        if (profile.newPassword && profile.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [profile, setProfile] = useState({
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        currentPassword: '',
        newPassword: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProfile(prev => ({...prev, [name]: value}));
    };

    // const handleSave = () => {
    //     onUpdateUser({
    //         name: profile.fullName,
    //         email: profile.email,
    //         phone: profile.phone,
    //     });
    //
    //     onBack();
    // };
    const handleSave = () => {
        if (!validate()) return;

        onUpdateUser({
            name: profile.fullName,
            email: profile.email,
            phone: profile.phone,
        });

        onBack();
    };

    return(
    <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-300">
        <header className="p-4 flex items-center border-b border-gray-100 sticky top-0 bg-white z-10">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition"><ChevronLeftIcon
                className="w-6 h-6 text-gray-600"/></button>
            <h1 className="text-lg font-bold text-gray-800">Account Settings</h1>
        </header>
        {/*<div className="p-6 space-y-5 flex-grow overflow-y-auto">*/}
        {/*<div className="p-6 space-y-5 flex-grow overflow-y-auto pb-28">*/}
        {/*<div className="flex-1 overflow-y-auto p-6 space-y-5">*/}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">{user.name}</label>
                <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border transition focus:outline-none focus:ring-2
    ${errors.fullName
                        ? "border-red-400 bg-red-50 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:ring-brand-pink-200"}
  `}
                />
            {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Email</label>
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border transition focus:outline-none focus:ring-2
    ${errors.email
                        ? "border-red-400 bg-red-50 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:ring-brand-pink-200"}
  `}
                />
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border transition focus:outline-none focus:ring-2
    ${errors.phone
                        ? "border-red-400 bg-red-50 focus:ring-red-200"
                        : "border-gray-200 bg-gray-50 focus:ring-brand-pink-200"}
  `}
                />
                {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
            </div>

            <div className="pt-4">
                <h3 className="text-sm font-bold text-gray-800 mb-3">Change Password</h3>
                <div className="space-y-3">
                    <input
                        type="password"
                        name="currentPassword"
                        value={profile.currentPassword}
                        onChange={handleChange}
                        placeholder="Current Password"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink-200 transition text-sm"/>
                    <input
                        type="password"
                        name="newPassword"
                        value={profile.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink-200 transition text-sm"/>
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
                    )}

                </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
                <button
                    onClick={handleSave}
                    className="w-full bg-brand-pink-500 text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-brand-pink-600 transition active:scale-[0.98]">Save
                    Changes
                </button>
            </div>
        </div>
        {/*<div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white">*/}
        {/*<div className="p-4 border-t border-gray-100 sticky bottom-0 bg-white pb-[calc(1rem+env(safe-area-inset-bottom))]">*/}
        {/*<div className="p-4 border-t border-gray-100 bg-white pb-[calc(1rem+env(safe-area-inset-bottom))]">*/}

    </div>
    )};

export const PaymentMethodsScreen: React.FC<SubScreenProps> = ({ onBack }) => (
  <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-300">
     <header className="p-4 flex items-center border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition"><ChevronLeftIcon className="w-6 h-6 text-gray-600" /></button>
        <h1 className="text-lg font-bold text-gray-800">Payment Methods</h1>
     </header>
     <div className="p-6 flex-grow overflow-y-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-xl mb-6 relative overflow-hidden group transition-transform hover:scale-[1.02]">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-brand-pink-500/20 rounded-full blur-xl"></div>
             <div className="flex justify-between items-start mb-8">
                 <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono">DEBIT</div>
                 <svg className="w-10 h-6 text-white opacity-80" viewBox="0 0 36 24" fill="currentColor"><path d="M12.245 21.75h3.955l2.46-15.166h-3.955L12.245 21.75zm-5.756-14.85c-2.052 0-3.128 1.088-3.948 3.18L0 21.75h4.187c.542 0 .986-.34 1.218-.878l.98-2.588h6.014l.564 2.588c.14.68.602.878 1.234.878h3.688L11.968 7.27c-.28-1.296-1.192-2.37-4.48-2.37h-1zm1.55 3.956c.606 0 1.052.324 1.052.324l2.136 10.14H6.16l1.88-9.552s.294-.912.998-.912zM32.98 6.584H36L32.79 21.75h-3.39c-1.15 0-1.63-.37-1.97-1.158L23.09 7.742l-.07.34c-.17.8-.678 2.546-1.36 4.402l-1.72-5.9H15.9l5.41 13.39c.576 1.418.966 1.95 2.67 1.776h4.34l4.66-15.166z"/></svg>
             </div>
             <p className="text-xl font-mono tracking-[0.15em] mb-6 shadow-sm">•••• •••• •••• 4242</p>
             <div className="flex justify-between text-xs uppercase tracking-wider opacity-70 mb-1">
                 <span>Card Holder</span>
                 <span>Expires</span>
             </div>
             <div className="flex justify-between font-bold text-sm tracking-wide">
                 <span>BEAUTY LOVER</span>
                 <span>12/25</span>
             </div>
        </div>
        
        <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                 <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <span className="text-[10px] font-bold text-blue-800">PAYPAL</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">PayPal</span>
                        <span className="text-xs text-gray-500">user@example.com</span>
                    </div>
                 </div>
                 <span className="text-xs font-medium text-brand-pink-500 cursor-pointer">Edit</span>
            </div>
        </div>

        <button className="w-full mt-6 border border-dashed border-gray-300 text-gray-500 font-medium py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 hover:border-brand-pink-300 hover:text-brand-pink-500 transition active:bg-brand-pink-50">
            <span className="mr-2 text-xl">+</span> Add New Card
        </button>
     </div>
  </div>
);

export const NotificationsScreen: React.FC<SubScreenProps> = ({ onBack }) => (
  <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-300">
     <header className="p-4 flex items-center border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition"><ChevronLeftIcon className="w-6 h-6 text-gray-600" /></button>
        <h1 className="text-lg font-bold text-gray-800">Notifications</h1>
     </header>
     <div className="p-6 space-y-8 flex-grow overflow-y-auto">
        <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Appointments</h2>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-gray-800">Booking Reminders</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Get notified 24h before appointment</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={true} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-pink-500"></div>
                    </label>
                </div>
                 <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-gray-800">Status Updates</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Changes to your booking status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={true} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-pink-500"></div>
                    </label>
                </div>
            </div>
        </section>
        
        <section>
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Marketing</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-gray-800">Promotions & Deals</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Receive exclusive offers via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={false} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-pink-500"></div>
                    </label>
                </div>
            </div>
        </section>
     </div>
  </div>
);
