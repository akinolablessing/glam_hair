import React from 'react';
import { Screen } from '../types';
import { SparklesIcon } from './Icons';

interface OnboardingProps {
  navigateTo: (screen: Screen) => void;
}

export const WelcomeScreen: React.FC<OnboardingProps> = ({ navigateTo }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FFF0F5] p-8 text-center animate-in fade-in duration-500">
      <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
        <SparklesIcon className="w-24 h-24 text-brand-pink-400" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-[#831843] mb-2">
        Welcome to<br/>GlamBook
      </h1>
      
      <p className="text-brand-pink-600 mb-12 font-medium text-sm leading-relaxed max-w-xs">
        Find and book your next beauty appointment with ease.
      </p>
      
      <button 
        onClick={() => navigateTo(Screen.LOGIN)}
        className="w-full max-w-xs bg-brand-pink-500 text-white font-bold py-4 rounded-full shadow-lg hover:bg-brand-pink-600 active:scale-95 transition-all text-lg"
      >
        Get Started
      </button>
    </div>
  );
};

export const LoginScreen: React.FC<OnboardingProps> = ({ navigateTo }) => {
  return (
    <div className="h-full flex flex-col bg-white p-8 animate-in slide-in-from-right duration-300">
      <div className="mt-12 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Join GlamBook</h1>
        <p className="text-gray-500">Sign up or log in to continue.</p>
      </div>

      <div className="space-y-4 flex-grow">
        <button 
          onClick={() => navigateTo(Screen.ROLE_SELECTION)}
          className="w-full py-3.5 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex justify-center items-center"
        >
          Continue with Email
        </button>
        
        <button 
          onClick={() => navigateTo(Screen.ROLE_SELECTION)}
          className="w-full py-3.5 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex justify-center items-center"
        >
          Continue with Phone
        </button>
        
        {/*<button */}
        {/*  onClick={() => navigateTo(Screen.ROLE_SELECTION)}*/}
        {/*  className="w-full py-3.5 px-4 bg-black text-white border border-black rounded-xl font-semibold hover:bg-gray-900 transition flex justify-center items-center shadow-md"*/}
        {/*>*/}
        {/*  Continue with Google*/}
        {/*</button>*/}

          <button
              onClick={() => {
                  // mock google user
                  setUser({
                      name: 'Google User',
                      email: 'googleuser@gmail.com',
                      avatarUrl: 'https://picsum.photos/200'
                  });

                  navigateTo(Screen.ROLE_SELECTION);
              }}
              className="w-full py-3.5 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition flex justify-center items-center gap-3"
          >
              <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
              />
              Continue with Google
          </button>
      </div>

      <div className="mt-auto text-center">
        <p className="text-[10px] text-gray-400 leading-tight">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export const RoleSelectionScreen: React.FC<OnboardingProps> = ({ navigateTo }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-8 animate-in slide-in-from-right duration-300">
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          How will you be using<br/>GlamBook?
        </h1>
        <p className="text-gray-500 text-sm">
          Choose your role to get a personalized experience.
        </p>
      </div>

      <div className="w-full space-y-6">
        <button 
          onClick={() => navigateTo(Screen.HOME)}
          className="w-full p-8 border border-brand-pink-100 rounded-2xl bg-white hover:border-brand-pink-300 hover:shadow-md transition-all group text-center"
        >
          <h2 className="text-xl font-bold text-[#831843] mb-2 group-hover:scale-105 transition-transform">I'm a Customer</h2>
          <p className="text-brand-pink-500 text-sm">I want to find and book stylists.</p>
        </button>

        <button 
          onClick={() => navigateTo(Screen.STYLIST_DASHBOARD)}
          className="w-full p-8 border border-purple-100 rounded-2xl bg-white hover:border-purple-300 hover:shadow-md transition-all group text-center"
        >
          <h2 className="text-xl font-bold text-purple-900 mb-2 group-hover:scale-105 transition-transform">I'm a Stylist</h2>
          <p className="text-purple-600 text-sm">I want to offer my services.</p>
        </button>
      </div>
    </div>
  );
};