import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Controller } from "react-hook-form";
import moment from 'moment';

export const InputDate = ({pageMode, label, fieldName, errors, register, currentVal, control}) => {
    const [startDate, setStartDate] = useState(new Date());

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
            <div className="row datepicker">
                <div className="col c3 labesl">{label}</div>            
            {pageMode === undefined ? 
            (<div className="col c3"><div>{currentVal}</div></div>) 
            : 
            (<div className="col c3">
              

              <Controller
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <DatePicker 
                        //using moment for consistent formatting
                        //dateFormat="EEEE, dd MMM yyyy hh:mm a"
                        showIcon 
                        name={fieldName}
                        showTimeSelect
                        useWeekdaysShort={true}
                        minDate={moment().toDate()}
                        maxDate= {moment().add( 365, 'day' ).toDate()}
                        selected={field.value}    
                        value={startDate}
                        onChange={date => {
                          if(moment(date).isValid()){
                            var formatted =  moment(date).format("dddd, DD MMM yyyy hh:mm A")
                            setStartDate(formatted) // controls the display
                            field.onChange(date) // puts the actual date in value
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