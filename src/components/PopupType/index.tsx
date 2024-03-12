// PopupType/index.jsx
import React, { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Popup } from 'react-vant';
import cx from 'classnames'
import { reqTypeList } from '@/api/bill'
import s from './style.module.scss'
import { Cross } from '@react-vant/icons';

type DictItem = Array<{id: string, name: string}>
interface Dict {
  expense: DictItem,
  income: DictItem,
}
interface Props {  
  onSelect: (item: string) => void;  
}
interface Methods {  
  show: () => void;
  close: () => void;
}

const PopupType:ForwardRefRenderFunction<Methods, Props> = (props , ref) => {
  const [show, setShow] = useState(false); // 组件的显示和隐藏
  const [active, setActive] = useState('all'); // 激活的 type
  const [expense, setExpense] = useState<DictItem>([]); // 支出类型标签
  const [income, setIncome] = useState<DictItem>([]); // 收入类型标签

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await reqTypeList() as { data: Dict }
      setExpense(data.expense)
      setIncome(data.income)
    };
    fetchData();
  }, [])

  useImperativeHandle(ref, () => ({
    show: () => {  
      setShow(true)  
    },
    close: () => {   
      setShow(false)  
    }  
  }));

  // 选择类型回调
  const choseType = (item: {id: string, name: string}) => {
    setActive(item.id)
    setShow(false)
    // 父组件传入的 onSelect，为了获取类型
    props.onSelect(item.id)
  };

  return <Popup
    visible={show}
    position='bottom'
  >
    <div className={s.popupType}>
      <div className={s.header}>
        请选择类型
        <Cross className={s.cross} onClick={() => setShow(false)} />
      </div>
      <div className={s.content}>
        <div onClick={() => choseType({ id: '', name: '' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型</div>
        <div className={s.title}>支出</div>
        <div className={s.expenseWrap}>
          {
            expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
          }
        </div>
        <div className={s.title}>收入</div>
        <div className={s.incomeWrap}>
          {
            income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
          }
        </div>
      </div>
    </div>
  </Popup>
};

export default forwardRef(PopupType);