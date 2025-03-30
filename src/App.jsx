import { Routes, Route } from 'react-router-dom';
import { Default, Auth, Booking } from '@/layouts';
import { NotFound } from './pages/NotFound';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import routes from '@/routes';
import React from 'react';

function App() {
  const { isLoggedIn } = useSelector(selectAuth);

  return (
    <Routes>
      <Route element={<Booking />}>
        {routes
          .find((r) => r.layout === 'booking')
          ?.pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      </Route>
      <Route element={<Default />}>
        {routes
          .find((r) => r.layout === 'default')
          ?.pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      </Route>

      <Route element={<Auth />}>
        {routes
          .find((r) => r.layout === 'auth')
          ?.pages.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
