
import React, { useRef } from 'react';
import { Screen, User } from '../types';
import BottomNav from './BottomNav';

interface ProfileScreenProps {
    user: User;
    onUpdateUser: (updates: Partial<User>) => void;
    navigateTo: (screen: Screen) => void;
    currentScreen: Screen;
    onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdateUser, navigateTo, currentScreen, onLogout }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showImagePreview, setShowImagePreview] = React.useState(false);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    onUpdateUser({ avatarUrl: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            <div className="bg-white pb-8 pt-12 px-6 rounded-b-[3rem] shadow-sm mb-6">
                <div className="flex flex-col items-center">
                     {/*<div className="w-24 h-24 rounded-full bg-brand-pink-100 p-1 mb-4 relative group cursor-pointer" onClick={triggerFileInput}>*/}
                    <div
                        className="w-24 h-24 rounded-full bg-brand-pink-100 p-1 mb-4 relative group cursor-pointer"
                        onClick={() => setShowImagePreview(true)}
                    >

                    <img src={user.avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white" />
                        {/*<button className="absolute bottom-0 right-0 bg-brand-pink-500 text-white p-1.5 rounded-full border-2 border-white group-hover:bg-brand-pink-600 transition shadow-sm">*/}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                triggerFileInput();
                            }}
                            className="absolute bottom-0 right-0 bg-brand-pink-500 text-white p-1.5 rounded-full border-2 border-white group-hover:bg-brand-pink-600 transition shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload}
                        />
                     </div>
                     <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
                     <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                        <span className="block text-lg font-bold text-gray-800">12</span>
                        <span className="text-xs text-gray-400">Bookings</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-lg font-bold text-gray-800">4</span>
                        <span className="text-xs text-gray-400">Reviews</span>
                    </div>
                     <div className="text-center">
                        <span className="block text-lg font-bold text-gray-800">250</span>
                        <span className="text-xs text-gray-400">Points</span>
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-3 flex-grow overflow-y-auto">
                <button 
                    onClick={() => navigateTo(Screen.PROFILE_SETTINGS)}
                    className="w-full bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center text-gray-700 hover:bg-gray-50 transition group"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <span className="font-medium">Account Settings</span>
                    </div>
                    <span className="text-gray-300 group-hover:text-brand-pink-300 group-hover:translate-x-1 transition">›</span>
                </button>

                 <button 
                    onClick={() => navigateTo(Screen.PROFILE_PAYMENTS)}
                    className="w-full bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center text-gray-700 hover:bg-gray-50 transition group"
                >
                     <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-3 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                        </div>
                        <span className="font-medium">Payment Methods</span>
                    </div>
                    <span className="text-gray-300 group-hover:text-brand-pink-300 group-hover:translate-x-1 transition">›</span>
                </button>

                 <button 
                    onClick={() => navigateTo(Screen.PROFILE_NOTIFICATIONS)}
                    className="w-full bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center text-gray-700 hover:bg-gray-50 transition group"
                >
                    <div className="flex items-center">
                         <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3 text-purple-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </div>
                        <span className="font-medium">Notifications</span>
                    </div>
                    <span className="text-gray-300 group-hover:text-brand-pink-300 group-hover:translate-x-1 transition">›</span>
                </button>

                 <button 
                    onClick={onLogout}
                    className="w-full bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center text-brand-pink-500 hover:bg-brand-pink-50 transition mt-4"
                >
                    <div className="flex items-center">
                         <div className="w-8 h-8 bg-brand-pink-50 rounded-lg flex items-center justify-center mr-3 text-brand-pink-500">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                         </div>
                        <span className="font-medium">Log Out</span>
                    </div>
                </button>
            </div>
            {showImagePreview && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                    onClick={() => setShowImagePreview(false)}
                >
                    <img
                        src={user.avatarUrl}
                        alt="Profile Preview"
                        className="max-w-[90%] max-h-[90%] rounded-2xl shadow-2xl"
                    />

                    <button
                        className="absolute top-6 right-6 text-white text-2xl"
                        onClick={() => setShowImagePreview(false)}
                    >
                        ✕
                    </button>
                </div>
            )}


            <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
        </div>
    );
};

export default ProfileScreen;
