
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import AgentViewReport from './pages/AgentViewReport';
import AgentCallDetails from './pages/AgentCallDetails';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/dashboard" replace />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/agents" element={
          <ProtectedRoute>
            <Layout>
              <Agents />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/agent/:id" element={
          <ProtectedRoute>
            <Layout>
              <AgentViewReport />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/agent-call-details/:id" element={
          <ProtectedRoute>
            <Layout>
              <AgentCallDetails />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
