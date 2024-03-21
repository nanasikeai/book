import { useEffect, useState } from 'react';
import s from './style.module.scss';
import cx from 'classnames';
import CustomIcon from '@/components/CustomIcon';
import { typeMap } from "@/utils/iconType"
import { Progress } from 'react-vant';

let proportionChart = null
const Statistics = () => {
  const [totalType, setTotalType] = useState('expense');
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    getData()
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose();
    }
  }, []);

  const setPieChart = (data) => {
    console.log(data)
    if (window.echarts) {
      proportionChart = echarts.init(document.getElementById('proportion'));
      proportionChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // 图例
          legend: {
              data: data.map(item => item.type_name)
          },
          series: [
            {
              name: '支出',
              type: 'pie',
              radius: '55%',
              data: data.map(item => {
                return {
                  value: item.number,
                  name: item.type_name
                }
              }),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
      })
    }
  }

  // 切换收支构成类型
  const changeTotalType = (type: string) => {
    setTotalType(type)
  }

  const getData = async () => {
    // const { data } = await get(`/api/bill/data?date=${currentMonth}`);
    const data = {
      total_expense: 717.00,
      total_income: 1100.00,
      total_data: [
        {
            "type_id": 6,
            "type_name": "学习",
            "pay_type": 1,
            "number": 20
        },
        {
            "type_id": 3,
            "type_name": "交通",
            "pay_type": 1,
            "number": 339
        },
        {
            "type_id": 15,
            "type_name": "退款",
            "pay_type": 2,
            "number": 1000
        },
        {
            "type_id": 10,
            "type_name": "其他",
            "pay_type": 1,
            "number": 333
        },
        {
            "type_id": 1,
            "type_name": "餐饮",
            "pay_type": 1,
            "number": 25
        },
        {
            "type_id": 14,
            "type_name": "理财",
            "pay_type": 2,
            "number": 100
        }
      ]
    }
  
    // 总收支
    setTotalExpense(data.total_expense);
    setTotalIncome(data.total_income);
  
    // 过滤支出和收入
    const expense_data = data.total_data.filter(item => item.pay_type == 1).sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
    const income_data = data.total_data.filter(item => item.pay_type == 2).sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
    setExpenseData(expense_data);
    setIncomeData(income_data);

    // 绘制饼图
    setPieChart(totalType == 'expense' ? expense_data : income_data);
  };
  
  return <div className={s.data}>
  <div className={s.total}>
    <div className={s.time}>
      <span>2021-06</span>
    </div>
    <div className={s.title}>共支出</div>
    <div className={s.expense}>¥1000</div>
    <div className={s.income}>共收入¥200</div>
  </div>
  <div className={s.structure}>
    <div className={s.head}>
      <span className={s.title}>收支构成</span>
      <div className={s.tab}>
        <span onClick={() => changeTotalType('expense')} className={cx({ [s.expense]: true, [s.active]: totalType == 'expense' })}>支出</span>
        <span onClick={() => changeTotalType('income')} className={cx({ [s.income]: true, [s.active]: totalType == 'income' })}>收入</span>
      </div>
    </div>
    <div className={s.content}>
      {
        (totalType == 'expense' ? expenseData : incomeData).map(item => <div key={item.type_id} className={s.item}>
          <div className={s.left}>
            <div className={s.type}>
              <span className={cx({ [s.expense]: totalType == 'expense', [s.income]: totalType == 'income' })}>
                <CustomIcon
                  name={item.type_id ? 'icon-' + typeMap[item.type_id].icon : 'icon-qita'}
                />
              </span>
              <span className={s.name}>{ item.type_name }</span>
            </div>
            <div className={s.progress}>¥{ Number(item.number).toFixed(2) || 0 }</div>
          </div>
          <div className={s.right}>
            <div className={s.percent}>
              <Progress
                percentage={Number((item.number / Number(totalType == 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
              />
            </div>
          </div>
        </div>)
      }
      <div className={s.proportion}>
        {/* <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span onClick={() => changePieType('expense')} className={cx({ [s.expense]: true, [s.active]: pieType == 'expense'  })}>支出</span>
            <span onClick={() => changePieType('income')} className={cx({ [s.income]: true, [s.active]: pieType == 'income'  })}>收入</span>
          </div>
        </div> */}
        <div id="proportion"></div>
      </div>
    </div>
  </div>
</div>
}

export default Statistics;