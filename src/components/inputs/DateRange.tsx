import React from 'react';
import { DatePicker, Space } from 'antd';
import 'dayjs/locale/de';
import locale from 'antd/es/date-picker/locale/de_DE'

import { dateToGermanString } from '@/utils/dateUtils';

const { RangePicker } = DatePicker;

const DateRange = ({setStartDate, setEndDate, onOpenChange, error}: {setStartDate: (date: Date) => void, setEndDate: (date: Date) => void, onOpenChange?: (open: boolean) => void, error?: boolean}) => {
  console.log(locale)


  const handleChange = (values: any) => {

    const start = new Date(values[0])
    const end = new Date(values[1])

    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Space direction="horizontal" size={12}>
      <RangePicker onOpenChange={onOpenChange} placement='topLeft' status={error ? 'error' : ''} onChange={handleChange} locale={locale} format="DD.MM.YYYY" 
      // getPopupContainer={(trigger) => {
      //     return trigger.parentElement as HTMLElement
      // }}        
      />
    </Space>
  )
};

export default DateRange;