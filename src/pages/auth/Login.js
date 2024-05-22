import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    onLogin();
    navigate("/");
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ minHeight: "100vh", backgroundColor: "#BEADFA" }}
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
          Student Care
        </span>
      </div>
      <div
        className="card shadow-lg  rounded-2 "
        style={{
          width: "25rem",
        }}
      >
        <div className="card-body">
          <h4 className="card-title text-center mb-5">Login</h4>
          <div className="mb-2">
            <label className="form-label fw-medium">Username</label>
            <input type="text" className={`form-control form-control-sm`} />
          </div>
          {/* <div className='mb-2'>
                        <div className='d-flex justify-content-between'>
                            <label className='form-label fw-medium'>Password</label>
                            <p className='fw-medium' style={{ fontSize: "10px" }}>Forgot Password?</p>
                        </div>
                        <input
                            type="password"
                            className={`form-control form-control-sm`}
                        />
                    </div> */}

          <div className="mb-2">
            <label className="form-label fw-medium">Password</label>

            <div className={`input-group mb-3`}>
              <input
                type={showPassword ? "text" : "password"}
                // className={`form-control ${
                //   formik.touched.password && formik.errors.password
                //     ? "is-invalid"
                //     : ""
                // }`}
                className="form-control"
                style={{
                  borderRadius: "3px",
                  borderRight: "none",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
                name="password"
                // {...formik.getFieldProps("password")}
              />
              <span
                className={`input-group-text iconInputBackground`}
                id="basic-addon1"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", borderRadius: "3px" }}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
              {/* {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )} */}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-medium">Company ID</label>
            <input type="text" className={`form-control form-control-sm`} />
          </div>
          <div className="d-flex justify-content-center mb-3">
            <button
              type="submit"
              className="btn btn-sm btn-button"
              style={{ width: "90px", borderRadius: "10px" }}
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <p className="fw-medium" style={{ fontSize: "15px" }}>
              Create An Account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
