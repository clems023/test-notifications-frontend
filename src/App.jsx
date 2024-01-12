import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import NotificationsList from './NotificationsList';
import AddNotification from './AddNotification';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/notifications" element={<NotificationsList />} />
        <Route path="/store" element={<AddNotification />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
