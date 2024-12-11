import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import Layout from './components/Layout';
import ProtectedRoute from './features/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Сторінки без авторизації */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Захищені маршрути */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ProjectDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
