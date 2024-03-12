import React, { useRef, useState } from 'react'
import s from './style.module.scss'
import { List } from 'react-vant'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import Bill from '@/model/bill'
import { reqBillList } from '@/api/bill'
import dayjs from 'dayjs'

const Home = () => {
  const typeRef = useRef(null); // 账单类型 ref
  const [list, setList] = useState<Array<Bill>>([])
  const [finished, setFinished] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM'))
  let [page, setPage] = useState(1)
  
  // 获取数据
  const onLoad = async () => {
    const params = {
      page,
      page_size: 10,
      date: currentDate,
    }
    const { data } = await reqBillList(params)
    setList(list.concat(data))
    setPage(page += 1)
    if (!data.length) {
      setFinished(true)
    }
  }

  // 打开弹窗
  const toggle = () => {
    // @ts-ignore 
    typeRef.current && typeRef.current.show()
  };

  // 筛选类型
  const select = (item: string) => {
    console.log(item)
  }

  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 2080.00</b></span>
        <span className={s.income}>总收入：<b>¥ 712.00</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggle}>
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
    <PopupType ref={typeRef} onSelect={select} />
  </div>
}

export default Home
