import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import AdminPage from './admin/AdminPage';
import AdminWriters from './admin/AdminWriters';
import ArticlePage from './admin/ArticlePage';
import { ContentProvider } from './context/ContentContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/writers" element={<AdminWriters />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route
          path="*"
          element={
            <ContentProvider>
              <App />
            </ContentProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);