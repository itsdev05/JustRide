import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllcars } from "../redux/actions/carsAction";
import { Row, Col, Divider, DatePicker, Checkbox,Input } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import Footer from "./Footer";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";

const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalcars, setTotalcars] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getAllcars());
  }, []);
  useEffect(() => {
    const filteredCars = cars.filter(car => car.name.toLowerCase().includes(search.toLowerCase()));
    setTotalcars(filteredCars);
  }, [cars,search]);
  function setFilter(values) {
    if (values) {
      if (values.length > 1) {
        // var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
        // var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");
        setFrom(moment(values[0]).format("MMM DD yyyy HH"));
        setTo(moment(values[1]).format("MMM DD yyyy HH"));
        var selectedFrom = moment(new Date(values[0]._d)).format(
          "MMM DD yyyy HH:mm"
        );
        var selectedTo = moment(new Date(values[1]._d)).format(
          "MMM DD yyyy HH:mm"
        );
        var temp = [];
        var filtercars = [];
        for (var car of cars) {
          if (car.bookedTimeSlots.length == 0) {
            temp.push(car);
          } else {
            for (var booking of car.bookedTimeSlots) {
              if (
                moment(values[0]._d).isBetween(
                  booking.from,
                  booking.to,
                  undefined,
                  "[]"
                ) ||
                moment(values[1]._d).isBetween(
                  booking.from,
                  booking.to,
                  undefined,
                  "[]"
                ) ||
                moment(booking.from).isBetween(
                  selectedFrom,
                  selectedTo,
                  undefined,
                  "[]"
                ) ||
                moment(booking.to).isBetween(
                  selectedFrom,
                  selectedTo,
                  undefined,
                  "[]"
                )
              ) {
                //console.log(car);
                filtercars.push(car);
              } else {
                temp.push(car);
                // return;
              }
            }
          }
        }
      } else {
        var temp = cars;
      }
    } else {
      var temp = cars;
    }
    var temp = [...new Set(temp)];
    temp =
      filtercars?.length > 0
        ? temp.filter((item) => !filtercars.includes(item)) //filtering the booked cars.....
        : temp;
    setTotalcars(temp);
  }
  return (
    <DefaultLayout>
      <HeroSection />
      <Row className="main-row" justify="center">
        <h1 className="Main-heading-home">
          Please Select a<span className="ml-2 mr-2"> Time Slot</span> For
          Booking 🚗
        </h1>
        <Col lg={20} sm={24} className="d-flex gap-2 align-items-center flex-column justify-content-center">
          {/* <RangePicker
            className="RangePicker"
            showTime={{ format: "HH:mm a" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
            style={{ height: "3.5rem", width: "37rem", marginBlock: "1rem" }}
          /> */}
          <Input type="search"
          onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search rides"
            style={{ height: "3.5rem", width: "37rem", borderRadius: "20px" }}
          />
        </Col>
      </Row>
      {loading == true && <Spinner />}
      {search && (
        <Row justify="center" gutter={[24, 16]}>
          {totalcars.map((car) => {
            return (
              <Col xl={5} lg={5} md={8} sm={12} xs={24}>
                <Link to={`/booking/${car._id}`}>
                  <div className="car p-2 box-shadow2 mt-3">
                    <div>
                      <img src={car.image} alt={car.name} className="carimg" />
                    </div>
                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div>
                        <p style={{ fontWeight: "bold", color: "#222f35 " }}>
                          {car.name}
                        </p>
                        <p style={{ color: "#222f35" }}>
                          Rs{car.rentPerHour} Per Hour /-
                        </p>
                      </div>
                      <div>
                        <button className="btn1 mr-2">
                          <Link to={`/booking/${car._id}`}> Book Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
      <Services />
      
      <Footer />
    </DefaultLayout>
  );
}

export default Home;
