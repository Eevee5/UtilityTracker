// import React from 'react';
// import App from './app.jsx';
// import { createRoot } from 'react-dom/client';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
