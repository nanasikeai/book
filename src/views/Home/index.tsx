import React, { useRef, useState } from 'react'
import s from './style.module.scss'
import { List } from 'react-vant'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import Bill from '@/model/bill'
import { reqBillList } from '@/api/bill'
import dayjs from 'dayjs'

const Home = () => {
  const typeRef = useRef(null); // 账单类型 ref
  const dateRef = useRef(null); // 账单日期 ref
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
  const toggleType = () => {
    // @ts-ignore 
    typeRef.current && typeRef.current.show()
  };

  const toggleDate = () => {
    // @ts-ignore 
    dateRef.current && dateRef.current.show()
  }

  // 筛选类型
  const selectType = (item: string) => {
    console.log(item)
  }

  const selectDate = (value: Date) => {
    console.log(value)
  }

  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 2080.00</b></span>
        <span className={s.income}>总收入：<b>¥ 712.00</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left} onClick={toggleType}>
          <span className={s.title}>全部类型</span>
        </div>
        <div className={s.right} onClick={toggleDate}>
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
    <PopupType ref={typeRef} onSelectType={selectType} />
    <PopupDate ref={dateRef} onSelectDate={selectDate}/>
  </div>
}

export default Home
