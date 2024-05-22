import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";

function Signup() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: "#a5e5e5", minHeight: "150vh" }}
    >
      <div className="d-flex justify-content-center  align-items-center my-3">
        <img
          src={logo}
          alt="LOGO"
          className="img-fluid"
          width="50"
          height="50"
        />
        <span
          className="text-white fs-2 fw-bolder mx-3"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          ATS
        </span>
      </div>
      <div
        className="card shadow-lg  rounded-2"
        style={{
          width: "50rem",
        }}
      >
        <div className="card-body">
          <h4 className="card-title text-center mb-5">Sign Up</h4>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Company ID</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Company Name</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Designation</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Address</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">City</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Pincode</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Email</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Phone</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">
                Registration Number
              </lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Tax Code</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Password</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
            <div className="col-md-6 col-12">
              <lable className="form-lable fw-medium">Confirm Password</lable>
              <input type="text" className="form-control form-control-sm" />
            </div>
          </div>
          <div className="form-check form-check-inline d-flex justify-content-center mb-4">
            <input type="checkbox" className="form-check-input" />
            <lable className="form-check-lable mx-2">
              I agree to the <Link to="/privacypolicy">Privacy Policy</Link> and{" "}
              <Link to="/terms&conditions">Terms and Conditions</Link>
            </lable>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <Link to="/">
              <button
                type="submit"
                className="btn btn-sm btn-button"
                style={{ width: "90px", borderRadius: "10px" }}
              >
                Sign Up
              </button>
            </Link>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <p className="fw-medium" style={{ fontSize: "15px" }}>
              Already have an Account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
