import React from 'react';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import './components/ComplaintForm.css';  // в ComplaintForm.js
import './components/ComplaintList.css';  // в ComplaintList.js

const App = () => (
  <>
    <ComplaintForm />
    <hr />
    <ComplaintList />
  </>
);

export default App;