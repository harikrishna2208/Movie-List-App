/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import { Layout } from 'antd';

import MovieListPage from './components/MoviesPage/MovieListPage';
import Login from './components/Login/index';
import SignUp from './components/Signup';

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout" style={{ paddingTop: 10 }}>
          <Content style={{ margin: '0 16px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
              <Route path="/main-page" element={<MovieListPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
