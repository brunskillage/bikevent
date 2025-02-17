import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import moment from 'moment';
import { momentToLocalString, PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";
import { globalLocation } from "../../lib/globalHooks";
import { Col, Form, Row } from "react-bootstrap";

export const InputDate2 = ({ pageMode, label, fieldName, currentVal, control, errors, reset, register }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log("location changed")

    let currentValOrNull = currentVal ? moment(currentVal).toDate() : null;

    if (pageMode === PAGE_MODE_VIEW) {
      setSelectedDate(currentValOrNull)
    }
    if (pageMode === PAGE_MODE_EDIT) {
      setSelectedDate(currentValOrNull)
    }
    if (pageMode === PAGE_MODE_ADD) {
      setSelectedDate(null)
      reset()
    }

    console.log("currentVal=" + currentVal)
    console.log("selectedDate=" + selectedDate)

  }, [globalLocation, currentVal])

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
      {/* <div className="row">
        <div className="col c3 label">{label}:</div>
        {pageMode === PAGE_MODE_VIEW ?
          (<><div className="col c4"><div>&nbsp;&nbsp;{momentToLocalString(currentVal)} ({moment(currentVal).fromNow()} time)</div></div></>)
          :
          (<div className="col c4">
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
                  selected={selectedDate}
                  //isClearable
                  dateFormat={"EEEE d MMM yyyy hh:mm aa"}
                  onChangeRaw={(e) => {
                    //e.target.dispatchEvent("changed")
                  }}
                  onChange={date => {
                    setSelectedDate(date)
                    field.onChange(date)
                    console.log("changed")

                  }}
                  disabled={false}
                />

              )}
            />
          </div>)}
        <div className="col c3">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <></>}</div>
      </div> */}



      <Controller
        name={fieldName}
        control={control}
        render={({ field }) =>
          <Form.Group as={Row} className="mb-3" controlId={"form" + { fieldName }}>
            <Form.Label column sm="2">
              {label}
            </Form.Label>
            <Col sm="8">
              {pageMode === PAGE_MODE_VIEW && <Form.Control plaintext readOnly defaultValue={currentVal} />}
              {pageMode === PAGE_MODE_ADD &&
                <>
                  <Form.Control isInvalid={!!errors[fieldName]}
                    {...register(fieldName)} errors={errors} />
                </>
              }
              {pageMode === PAGE_MODE_EDIT &&
                <>
                  <Form.Control isInvalid={!!errors[fieldName]}
                    {...register(fieldName)} errors={errors} />
                </>
              }

              {errors[fieldName] && <Form.Control.Feedback type="invalid">
                {errors[fieldName].message}
              </Form.Control.Feedback>}
            </Col>
          </Form.Group >}
      ></Controller >

    </>
  );
}