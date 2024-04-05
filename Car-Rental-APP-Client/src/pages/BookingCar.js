import React, { useEffect, useState } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import {
  DollarCircleOutlined,
  TagsOutlined,
  carOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { getAllcars } from "../redux/actions/carsAction";
import { useParams,Link } from "react-router-dom";
import moment from "moment";
import { bookcar } from "../redux/actions/bookingActions";
import Footer from "./Footer";
import TaC from "../components/TaC";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { notification } from 'antd'
const { RangePicker } = DatePicker;

function Bookingcar() {
  const { id } = useParams();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalMins, setTotalMins] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bookPress, setBookPress] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllcars());
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCar(cars.find((car) => car._id === id));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [cars, dispatch, id]);

  useEffect(() => {
    if (car._id) {
      const selectedFrom = moment(from);
      const selectedTo = moment(to);
      const overlaps = car.bookedTimeSlots.some((slot) => {
        const bookedFrom = moment(slot.from);
        const bookedTo = moment(slot.to);
        return (
          (selectedFrom.isSameOrAfter(bookedFrom) &&
            selectedFrom.isBefore(bookedTo)) ||
          (selectedTo.isAfter(bookedFrom) && selectedTo.isSameOrBefore(bookedTo)) ||
          (bookedFrom.isSameOrAfter(selectedFrom) &&
            bookedFrom.isBefore(selectedTo)) ||
          (bookedTo.isAfter(selectedFrom) && bookedTo.isSameOrBefore(selectedTo))
          // notification.success({
          //   message: 'Thank you for your feedback!',
          //   description: 'We appreciate your valuable input.',
          // })
        );
        
      });
      if (overlaps) {
        // If there is an overlap, reset the selected time range
        notification.error({
          message: 'Time Slot Overlaps',
          description: 'The selected time slot overlaps with another booked slot. Please select another time slot or another car.',
        });
        setFrom(null);
        setTo(null);
      } else {
        // Calculate total minutes and total amount if no overlap
        const totalMinutes = selectedTo.diff(selectedFrom, "minutes");
        setTotalMins(totalMinutes);
        let amount = totalMinutes * Math.ceil(car.rentPerHour / 60);
        if (driver) {
          amount += 5 * totalMinutes;
        }
        setTotalAmount(amount);
      }
    }
  }, [car, from, to, driver]);

  function selectTimeSlots(values) {
    if (values) {
      setFrom(values[0]);
      setTo(values[1]);
    } else {
      setFrom(null);
      setTo(null);
    }
  }
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: id,
      totalMins,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookcar(reqObj));
  }
  
  function handleDriverChange(e) {
    setDriver(e.target.checked);
  }

  function handleBooking() {
    if (!from || !to) {
      // Handle case when user hasn't selected time slots
      return;
    }

    if (driver) {
      // Additional logic if driver is required
    }

    // Dispatch action to book the car
    dispatch(
      bookcar({
        car: car._id,
        from,
        to,
        totalMins,
        totalAmount,
        driverRequired: driver,
      })
    );

    // Additional actions after booking
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} alt={car.name} className="carimg2 bs2" />
        </Col>
        <Col lg={10} sm={24} xs={24} style={{ marginLeft: "65px", bottom: "10px" }}>
          <div style={{ backgroundColor: "#28d8d8", borderRadius: "10px", width: "90%" }}>
            <Divider><h4 style={{ color: "white" }}>DETAILS</h4></Divider>
            {/* Car details rendering code */}
            <Divider><h4 style={{ color: "white" }}>SELECT TIME SLOTS</h4></Divider>
            <div>
              <RangePicker
                className="RangePicker"
                showTime={{ format: "HH:mm a" }}
                format="MMM DD yyyy HH:mm"
                onChange={selectTimeSlots}
                value={[from, to]}
              />
              <br />
              <button
                className="btn1 mt-2 mb-2"
                style={{ marginBottom: "4px", borderRadius: "5px", outline: "none", border: "none" }}
                onClick={() => setShowModal(true)}
              >
                See Booked Slots
              </button>
              {from && to && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "end", marginRight: "56px", color: "white" }}>
                  <p>Total Minutes: <b>{totalMins}</b></p>
                  <Checkbox onChange={handleDriverChange} style={{ color: "white" }}>Driver Required</Checkbox>
                  <h3>Total Amount: {totalAmount}</h3>
                  {bookPress ? (
                    <TaC onToken={onToken} totalAmount={totalAmount} />
                  ) : (
                    <button
                      className="btn1"
                      style={{ marginBottom: "4px", borderRadius: "5px", fontWeight: "500", outline: "none", border: "none" }}
                      onClick={() => setBookPress(true)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>
        {car.name && (
          <Modal visible={showModal} closable={false} footer={false} title="Booked time slots">
            <div className="p-2">
              {car.bookedTimeSlots.map((slot, index) => (
                <button key={index} className="btn1 mt-2 ml-2">{slot.from} - {slot.to}</button>
              ))}
              <div className="text-right mt-5">
                <button className="btn1" onClick={() => setShowModal(false)}>CLOSE</button>
              </div>
            </div>
          </Modal>
        )}
        <Link to='booking/feedback'>Give Feedback</Link>
      </Row>
      <Footer />
    </DefaultLayout>
  );
}

export default Bookingcar;
