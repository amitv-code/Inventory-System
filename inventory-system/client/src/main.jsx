import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory.jsx';
import App from './App.jsx';
import './index.css';
import BulkUpload from './components/BulkUpload.jsx';
import BulkEdit from './components/BulkEdit.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />
        <Route path="/bulk-edit" element={<BulkEdit />} />
      </Routes>
    </Router>
  </React.StrictMode>
);