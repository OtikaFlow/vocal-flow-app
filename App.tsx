import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Installation from './pages/Installation';
import PricingUnified from './pages/PricingUnified';
import Contact from './pages/Contact';
import Demos from './pages/Demos';
import DatabaseFeature from './pages/features/Database';
import FeaturesDetail from './pages/FeaturesDetail';
import AdminDashboard from './pages/AdminDashboard';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import HudOverlay from './components/HudOverlay';

import Footer from './components/Footer';
import { BookingProvider } from './context/BookingContext';
import BookingModal from './components/BookingModal';

import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Navigation />
        <HudOverlay />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/features" element={<FeaturesDetail />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/tarification" element={<PricingUnified />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features/database" element={<DatabaseFeature />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
        </Routes>
        <BookingModal />
        <Footer />
      </Router>
    </BookingProvider>
  );
}