import React, { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react'
import { DatetimePicker, Popup } from 'react-vant';

interface Props {  
  onSelectDate: (value: Date) => void;  
}
interface Methods {  
  show: () => void;
  close: () => void;
}

const PopupDate:ForwardRefRenderFunction<Methods, Props> = (props , ref) => {
  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true)  
    },
    close: () => {   
      setShow(false)  
    }  
  }));

  const choseDate = (value: Date) => {
    setShow(false)
    props.onSelectDate(value)
  };

  return <Popup
    visible={show}
    position='bottom'
  >
    <DatetimePicker
      title='选择年月'
      type='year-month'
      minDate={new Date(2020, 0, 1)}
      maxDate={new Date(2025, 10, 1)}
      defaultValue={new Date()}
      onConfirm={(value: Date) => choseDate(value)}
      onCancel={() => setShow(false)}
    />
  </Popup>
};

export default forwardRef(PopupDate);