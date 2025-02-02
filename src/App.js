import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import ArtistList from './components/ArtistList';
import Artists from './pages/Artists';
import Home from './pages/Home';
import About from './pages/About';
import Map from './pages/Map';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Navigation />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/map" element={<Map />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:artistName" element={<ArtistList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;