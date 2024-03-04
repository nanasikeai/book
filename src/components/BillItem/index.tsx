import { Card, Cell } from "react-vant"
import s from './style.module.scss'
import { typeMap } from "@/utils/iconType"
import Bill from '@/model/bill'
import CustomIcon from '@/components/CustomIcon'

const BillItem = ({bill}: {bill: Bill}) => {

  return (
    <div className={s.item}>
      <Card round >
        <Card.Header>
          <div className={s.date}>{bill.date}</div>
          <div className={s.money}>
            <span>
              <img src="http://s.yezgea02.com/1615953405599/shou%402x.png" alt="" />
              ￥900
            </span>
            <span>
              <img src="http://s.yezgea02.com/1615953405599/zhi%402x.png" alt="" />
              ￥6767
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          {
            bill && bill.details.map((item, index) => 
              <Cell 
                key={index}
                title={
                  <div className={s.itemTitle}>
                    <div>{item.type_name}</div>
                    <div style={{color: item.pay_type === 1 ? 'green' : 'orange'}}>
                      {item.pay_type === 1 ? '-' : '+'}￥{item.amount}
                    </div>
                  </div>
                }
                label={
                  <div>
                    {item.createTime.split(" ")[1].slice(0,5)} | {item.remark}
                  </div>
                }
                icon={
                  <CustomIcon
                    style={{fontSize: '30px', marginTop: '10px'}}
                    name={item.type_id ? 'icon-' + typeMap[item.type_id].icon : 'icon-qita'}
                  />
                }
              ></Cell>
            )
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default BillItem