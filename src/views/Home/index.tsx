import React, { useState } from 'react'

import s from './style.module.scss'
import { ArrowDown } from '@react-vant/icons'
import { List } from 'react-vant'
import BillItem from '@/components/BillItem'

const Home = () => {
  const [list, setList] = useState<Array<object>>([
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    },
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    }
  ])
  const [finished, setFinished] = useState<boolean>(true)

  const onLoad = async () => {
    console.log(111)
  }

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
    <div className={s.content}>
      <List finished={finished} onLoad={onLoad}>
        {
          list.map((item, index) => <BillItem bill={item} key={index}/>)
        }
      </List>
    </div>
  </div>
}

export default Home
