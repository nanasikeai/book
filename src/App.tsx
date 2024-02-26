import NavBar from '@/components/NavBar';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'react-vant';
import routes from '@/router';
import { useEffect, useState } from 'react';

export default function App() {
  const location = useLocation() // 拿到 location 实例
  const { pathname } = location // 获取当前路径
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav

  useEffect(() =>  {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  
  return (
    <ConfigProvider>
      <>
        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>
        <NavBar showNav={showNav}/>
      </>
    </ConfigProvider>
  );
}
