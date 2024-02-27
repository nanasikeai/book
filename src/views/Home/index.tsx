import React from 'react'

import s from './style.module.scss'
import { ArrowDown } from '@react-vant/icons'

const Home = () => {
  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 208.00</b></span>
        <span className={s.income}>总收入：<b>¥ 712.00</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title}>全部类型</span>
        </div>
        <div className={s.right}>
          <span className={s.time}>2022-06</span>
        </div>
      </div>
    </div>
  </div>
}

export default Home
