
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import AgentViewReport from './pages/AgentViewReport';
import AgentCallDetails from './pages/AgentCallDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agent/:id" element={<AgentViewReport />} />
          <Route path="/agent-call-details/:id" element={<AgentCallDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
