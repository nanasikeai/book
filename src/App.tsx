import NavBar from '@/components/NavBar';
import { Route, Router, Routes } from 'react-router-dom';
import { ConfigProvider } from 'react-vant';
import routes from '@/router';

export default function App() {
  return (
    <ConfigProvider>
      <>
        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>
        <NavBar/>
      </>
    </ConfigProvider>
  );
}
