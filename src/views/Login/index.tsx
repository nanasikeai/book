import React, { 
    useRef
  } from "react";
import s from "./style.module.scss";
import { Cell, Input } from "react-vant";
import { Contact, Lock, ShieldO} from '@react-vant/icons'
import Captcha from "react-captcha-code";

const Login = () => {
  const handleChange = (value: string) => {
    console.log(value);
  }

  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span>注册</span>
      </div>
      <div className={s.form}>
        <Cell icon={<Contact />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
          />
        </Cell>
        <Cell icon={<Lock />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
          />
        </Cell>
        <Cell icon={<ShieldO />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
          />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell>
      </div>
    </div>
  );
};

export default Login