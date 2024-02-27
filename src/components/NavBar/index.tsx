import React, {
  useState
} from 'react';
import { Tabbar } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import { OrdersO, BarChartO, UserO } from '@react-vant/icons'

interface Props {
  showNav: Boolean
}

const NavBar = ({ showNav }: Props) => {
  const [active, setActive] = useState('/');
  const navigateTo = useNavigate();

  const setPath = (p: string) => {
    setActive(p)
    navigateTo(p)
  }

  return (
    <>
      {
        showNav ? (<Tabbar onChange={p => setPath(p as string)}>
          <Tabbar.Item name='/' icon={<OrdersO />}>
            账单
          </Tabbar.Item>
          <Tabbar.Item name='statistics' icon={<BarChartO />}>
            统计
          </Tabbar.Item>
          <Tabbar.Item name='user' icon={<UserO />}>
            我的
          </Tabbar.Item>
        </Tabbar>) : null
      }
    </>
  )
}

export default NavBar;
