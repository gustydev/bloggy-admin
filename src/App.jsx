import './App.css'
import { Outlet } from 'react-router-dom';
import TopBar from './components/dashboard/TopBar';
import AuthProvider from './hooks/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <TopBar></TopBar>
      <Outlet></Outlet>      
    </AuthProvider>
  )
}

export default App
