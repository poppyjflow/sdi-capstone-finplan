import React from 'react';
import { Outlet } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';

const AuthWrapper = () => {
  const [user, setUser] = useSessionStorage('user', { auth: '', user: '' });
  return <Outlet context={[user, setUser]} />;
};

export default AuthWrapper;