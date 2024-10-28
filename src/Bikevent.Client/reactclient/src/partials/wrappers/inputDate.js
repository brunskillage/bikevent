import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import moment from 'moment';
import { momentDisplayFormat, momentToLocal, momentToLocalString, PAGE_MODE_VIEW } from "../../lib/common";

export const InputDate = ({ pageMode, label, fieldName, currentVal, control }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (currentVal) {
      let local = momentToLocal(currentVal).toDate()
      // let t = moment().toString()
      setSelectedDate(local)
    }

  }, [currentVal])

  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "0.5em", background: "#216ba5", color: "#fff", width: "20.7em" }}>
        <CalendarContainer className={className}>
          <div >{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <>
      <div></div>
      <div className="row datepicker">
        <div className="col c3 labesl">{label}</div>
        {pageMode === PAGE_MODE_VIEW ?
          (<><div className="col c3"><div> {momentToLocalString(currentVal)} ({moment(currentVal).fromNow()} time)</div></div></>)
          :
          (<div className="col c3">

            <Controller
              control={control}
              name={fieldName}
              render={({ field }) => (
                <DatePicker
                  // //using moment for consistent formatting
                  showIcon
                  name={fieldName}
                  showTimeSelect
                  useWeekdaysShort={true}
                  minDate={moment().toDate()}
                  maxDate={moment().add(365, 'day').toDate()}
                  selected={moment(selectedDate).toDate()}
                  dateFormat={"EEEE d MMM yyyy hh:mm aa"}
                  value={field.value ? momentToLocal(field.value).toDate() : new Date()}
                  onChange={date => {
                    if (moment(date).isValid()) {
                      setSelectedDate(date) // controls the display
                      field.onChange(moment(date).toISOString()) // puts the actual date in value
                    }
                  }}
                  calendarContainer={MyContainer}
                  disabled={false}
                />

              )}
            />
          </div>)}
        <div className="col c4"></div>
      </div>
    </>
  );
}