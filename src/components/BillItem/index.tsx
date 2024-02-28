import { Card } from "react-vant"
import s from './style.module.scss'
import { createFromIconfontCN } from '@react-vant/icons'

const BillItem = ({bill}: any) => {
  const CustomIcon = createFromIconfontCN(
    '//at.alicdn.com/t/c/font_4448088_x8hxzb571wh.js'
  )

  return (
    <div className={s.item}>
      <Card round >
        <Card.Header>
          <div className={s.date}>{bill.date}</div>
          <div className={s.money}>
            <span>
              <img src="http://s.yezgea02.com/1615953405599/zhi%402x.png" alt="" />
              ￥900
            </span>
            <span>
              <img src="http://s.yezgea02.com/1615953405599/shou%402x.png" alt="" />
              ￥6767
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <CustomIcon name='icon-canyin'/>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BillItem