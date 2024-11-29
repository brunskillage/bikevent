/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from 'moment';
import { momentDisplayDayFormat, momentToLocalString, PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";
import { globalLocation, globalNavigate } from "../../lib/globalHooks";
import { Col, Form, Row } from "react-bootstrap";

export const InputDate = ({ pageMode, label, fieldName, currentVal, control, errors, register, setValue }) => {
  //const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateHidden, setSelectedDateHidden] = useState(null);

  //moment(selectedDate).isValid() ? moment(selectedDate).format('YYYY-MM-DDTHH:mm') : null }

  useEffect(() => {
    console.log("location changed")

    if (pageMode === PAGE_MODE_VIEW) {
      setSelectedDateHidden(moment(currentVal))
    }

    if (pageMode === PAGE_MODE_EDIT) {
      setSelectedDateHidden(moment(currentVal).utc().format())
      setSelectedDay(moment(currentVal).format('YYYY-MM-DD'))
      setSelectedTime(moment(currentVal).format('HH:mm'))
    }

    if (pageMode === PAGE_MODE_ADD) {
      setSelectedDateHidden(null)
      setValue(fieldName, null)
    }

    console.log("currentVal=" + currentVal)
    console.log("setSelectedDateHidden=" + setSelectedDateHidden)

  }, [currentVal, pageMode])

  useEffect(() => {
    if (selectedDay && selectedTime) {
      let selectedDate = selectedDay + " " + selectedTime
      setSelectedDateHidden(selectedDate)
      setValue(fieldName, selectedDate)
    }
  }, [selectedDay, selectedTime])

  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId={"form" + { fieldName }}>
        <Form.Label column sm="3">
          <b>{label}</b>
        </Form.Label>

        <Col sm="8">

          {pageMode === PAGE_MODE_VIEW &&
            <Form.Control plaintext readOnly value={moment(currentVal).local().format('hh:mm a, dddd, DD MMMM YYYY')} />}

          {pageMode === PAGE_MODE_ADD &&
            <>
              <Form.Control isInvalid={!!errors[fieldName]} type="date" onChange={e => setSelectedDay(e.target.value)} />
              <Form.Control isInvalid={!!errors[fieldName]} disabled={!selectedDay} type="time" onChange={e => setSelectedTime(e.target.value)} />
              <Form.Control isInvalid={!!errors[fieldName]} type="hidden"  {...register(fieldName)} value={selectedDateHidden} />
            </>
          }

          {pageMode === PAGE_MODE_EDIT &&
            <>
              <Form.Control isInvalid={!!errors[fieldName]} value={selectedDay} type="date" onChange={e => setSelectedDay(e.target.value)} />
              <Form.Control isInvalid={!!errors[fieldName]} disabled={!selectedDay} value={selectedTime} type="time" onChange={e => setSelectedTime(e.target.value)} />
              <Form.Control isInvalid={!!errors[fieldName]} type="hidden" {...register(fieldName)} value={selectedDateHidden} />
            </>
          }

          {errors[fieldName] && <Form.Control.Feedback type="invalid">
            {errors[fieldName].message}
          </Form.Control.Feedback>}
        </Col>
      </Form.Group >
    </>
  );
}