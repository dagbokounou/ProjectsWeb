import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Account from './pages/Account/Account'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import MediaReader from './pages/MediaReader/MediaReader';
import NotificationComponent from './components/NotificationComponent/NotificationComponent';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Account />} />
        <Route path='/reader/:slug' element={<MediaReader />} />
        <Route path='/*' element={<ErrorPage />} />

      </Routes>
      <NotificationComponent />

    </BrowserRouter>
  );
}

export default App;
