import React, {
  useState
} from 'react';
import { Tabbar } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { OrdersO, BarChartO, UserO } from '@react-vant/icons'

const NavBar = () => {
  const [active, setActive] = useState('/');
  const navigateTo = useNavigate();

  const setPath = (p: string) => {
    setActive(p)
    navigateTo(p)
  }

  return (
    <Tabbar onChange={p => setPath(p as string)}>
      <Tabbar.Item name='home' icon={<OrdersO />}>
        账单
      </Tabbar.Item>
      <Tabbar.Item name='Statistics' icon={<BarChartO />}>
        统计
      </Tabbar.Item>
      <Tabbar.Item name='user' icon={<UserO />}>
        我的
      </Tabbar.Item>
    </Tabbar>
  )
}

export default NavBar;
