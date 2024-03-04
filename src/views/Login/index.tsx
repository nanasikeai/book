import React, { 
    useState
  } from "react";
import s from "./style.module.scss";
import { Button, Cell, Checkbox, Input } from "react-vant";
import { Contact, Lock, ShieldO} from '@react-vant/icons'
import Captcha from "react-captcha-code";
import { Notify } from 'react-vant';
import cx from 'classnames'
import LoginData from '@/model/loginData'
import { reqLogin, reqRegister } from "@/api/user";

const Login = () => {
  // 操作类型（注册、登录）
  const [type, setType] = useState<string>('login')

  // 验证码
  const [captcha, setCaptcha] = useState<string>('')
  const handleChange = (value: string) => {
    setCaptcha(value)
  }

  // 表单数据
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
    verify: ''
  })

  // 注册
  const onSubmit = async () => {
    if (!formData.username) {
      Notify.show('请输入账号');
      return
    }
    if (!formData.password) {
      Notify.show('请输入密码');
      return
    }
    if (type === 'register') {
      // 注册
      if (!formData.verify) {
        Notify.show('请输入验证码')
        return
      }
      if (formData.verify !== captcha) {
        Notify.show('验证码错误')
        return
      }
      await reqRegister(formData)
      Notify.show({ type: 'success', message: '注册成功' })
      setType('login')
    } else {
      // 登录
      const { data } = await reqLogin(formData)
      localStorage.setItem("token", data.token)
      window.location.href = '/';
    }
  }

  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span
          className={cx({[s.active]: type === 'login'})}
          onClick={() => setType('login')}
        >登录</span>
        <span 
          className={cx({[s.active]: type === 'register'})}
          onClick={() => setType('register')}
        >注册</span>
      </div>
      <div className={s.form}>
        <Cell icon={<Contact />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={value => setFormData({
              ...formData,
              username: value
            })}
          />
        </Cell>
        <Cell icon={<Lock />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={value => setFormData({
              ...formData,
              password: value
            })}
          />
        </Cell>
        {
          type === 'register' ? (<Cell icon={<ShieldO />}>
              <Input
                clearable
                type="text"
                placeholder="请输入验证码"
                onChange={value => setFormData({
                  ...formData,
                  verify: value
                })}
              />
              <Captcha charNum={4} onChange={handleChange} />
            </Cell>) : null
        }
      </div>
      <div className={s.operation}>
        {
          type === 'register' ? (<div className={s.agree}>
            <Checkbox>同意并阅读<a>《用户手册》</a></Checkbox>
          </div>) : null
        } 
        <Button block type='primary' onClick={onSubmit}>{ type === 'register' ? '注册' : '登录' }</Button>
      </div>
    </div>
  );
};

export default Login