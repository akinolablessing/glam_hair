
import React, { useState, useCallback } from 'react';
import { Screen, Stylist, Booking, User } from './types';
import { DUMMY_STYLISTS } from './constants';
import CustomerHomeScreen from './components/CustomerHomeScreen';
import StylistProfileScreen from './components/StylistProfileScreen';
import BookingScreen from './components/BookingScreen';
import BookingsListScreen from './components/BookingsListScreen';
import FavoritesScreen from './components/FavoritesScreen';
import ProfileScreen from './components/ProfileScreen';
import { AccountSettingsScreen, PaymentMethodsScreen, NotificationsScreen } from './components/ProfileSubScreens';
import { WelcomeScreen, LoginScreen, RoleSelectionScreen } from './components/OnboardingScreens';
import StylistDashboard from './components/StylistDashboard';

const App: React.FC = () => {
  // Start at WELCOME screen
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [bookingService, setBookingService] = useState<{ name: string, price: number } | null>(null);
  
  // User State
    const [user, setUser] = useState<User>({
        name: 'Beauty Lover',
        email: 'user@example.com',
        phone: '+1 (555) 123-4567',
        avatarUrl: '/avatar.png',
    });

    const handleUpdateUser = (updates: Partial<User>) => {
        setUser(prev => ({ ...prev, ...updates }));
    };
  
  const [bookings, setBookings] = useState<Booking[]>([
      {
          id: 'b0',
          stylistId: '1',
          stylistName: 'Elena Rodriguez',
          stylistImage: 'https://picsum.photos/400/400?random=1',
          serviceName: 'Balayage',
          price: 200,
          date: new Date(Date.now() - 86400000 * 2), // 2 days ago
          time: '02:00 PM',
          status: 'completed'
      }
  ]);
  
  // Mock favorites (IDs 1 and 3)
  const [favorites] = useState<Stylist[]>([DUMMY_STYLISTS[0], DUMMY_STYLISTS[2]]);

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
    // Clear selections when navigating to main tabs
    if ([Screen.HOME, Screen.BOOKINGS_LIST, Screen.FAVORITES, Screen.PROFILE].includes(screen)) {
         setSelectedStylist(null);
         setBookingService(null);
    }
  }, []);

  const handleSelectStylist = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    setCurrentScreen(Screen.STYLIST_DETAILS);
  };

  const handleInitiateBooking = (stylist: Stylist, serviceName: string, price: number) => {
    setSelectedStylist(stylist);
    setBookingService({ name: serviceName, price });
    setCurrentScreen(Screen.BOOKING_CALENDAR);
  };

  const handleConfirmBooking = (date: Date, time: string) => {
      if (!selectedStylist || !bookingService) return;

      const newBooking: Booking = {
          id: `b${Date.now()}`,
          stylistId: selectedStylist.id,
          stylistName: selectedStylist.name,
          stylistImage: selectedStylist.imageUrl,
          serviceName: bookingService.name,
          price: bookingService.price,
          date: date,
          time: time,
          status: 'upcoming'
      };

      setBookings(prev => [newBooking, ...prev]);
      setCurrentScreen(Screen.BOOKINGS_LIST);
      // alert(`Booking confirmed with ${selectedStylist.name} on ${date.toLocaleDateString()} at ${time}!`);
  };

  const handleLogout = () => {
      // In a real app, this would clear auth tokens
      // Reset to welcome screen
      navigateTo(Screen.WELCOME);
  };

  // const handleUpdateUser = (updates: Partial<User>) => {
  //     setUser(prev => ({ ...prev, ...updates }));
  // };

  return (
    <div className="h-full w-full font-sans text-gray-900">
      {currentScreen === Screen.WELCOME && (
        <WelcomeScreen navigateTo={navigateTo} />
      )}

      {currentScreen === Screen.LOGIN && (
        <LoginScreen navigateTo={navigateTo} />
      )}

      {currentScreen === Screen.ROLE_SELECTION && (
        <RoleSelectionScreen navigateTo={navigateTo} />
      )}

      {currentScreen === Screen.HOME && (
        <CustomerHomeScreen 
            userName={user.name}
            onSelectStylist={handleSelectStylist} 
            navigateTo={navigateTo} 
            currentScreen={currentScreen}
            onLogout={handleLogout}
        />
      )}

      {currentScreen === Screen.STYLIST_DETAILS && selectedStylist && (
        <StylistProfileScreen 
            stylist={selectedStylist} 
            onBack={() => navigateTo(Screen.HOME)}
            onBookService={handleInitiateBooking}
        />
      )}

      {currentScreen === Screen.BOOKING_CALENDAR && selectedStylist && bookingService && (
        <BookingScreen 
            stylist={selectedStylist}
            serviceName={bookingService.name}
            servicePrice={bookingService.price}
            onBack={() => setCurrentScreen(Screen.STYLIST_DETAILS)}
            onConfirmBooking={handleConfirmBooking}
        />
      )}

      {currentScreen === Screen.BOOKINGS_LIST && (
          <BookingsListScreen 
            bookings={bookings}
            navigateTo={navigateTo}
            currentScreen={currentScreen}
          />
      )}

      {currentScreen === Screen.FAVORITES && (
          <FavoritesScreen
            favorites={favorites}
            navigateTo={navigateTo}
            currentScreen={currentScreen}
            onSelectStylist={handleSelectStylist}
          />
      )}

      {/*{currentScreen === Screen.PROFILE && (*/}
      {/*    <ProfileScreen*/}
      {/*      user={user}*/}
      {/*      onUpdateUser={handleUpdateUser}*/}
      {/*      navigateTo={navigateTo}*/}
      {/*      currentScreen={currentScreen}*/}
      {/*      onLogout={handleLogout}*/}
      {/*    />*/}
      {/*)}*/}

      {/*{currentScreen === Screen.PROFILE_SETTINGS && (*/}
      {/*    <AccountSettingsScreen onBack={() => navigateTo(Screen.PROFILE)} />*/}
      {/*)}*/}
        {currentScreen === Screen.PROFILE && (
            <ProfileScreen
                user={user}
                onUpdateUser={handleUpdateUser}
                navigateTo={navigateTo}
                currentScreen={currentScreen}
                oonLogout={handleLogout}
            />
        )}

        {currentScreen === Screen.PROFILE_SETTINGS && (
            <AccountSettingsScreen
                user={user}
                onUpdateUser={handleUpdateUser}
                onBack={() => navigateTo(Screen.PROFILE)}
            />
        )}


        {currentScreen === Screen.PROFILE_PAYMENTS && (
          <PaymentMethodsScreen onBack={() => navigateTo(Screen.PROFILE)} />
      )}

      {currentScreen === Screen.PROFILE_NOTIFICATIONS && (
          <NotificationsScreen onBack={() => navigateTo(Screen.PROFILE)} />
      )}

      {currentScreen === Screen.STYLIST_DASHBOARD && (
          <StylistDashboard 
            userName={user.name}
            onLogout={handleLogout}
          />
      )}
    </div>
  );
};

export default App;