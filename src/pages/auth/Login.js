import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../config/URL";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required"),
});


function Login({ onLogin }) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = await api.post(`studentCareLogin`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
         const { role } = response.data;
          if (role === "STUDENTCARE_PARENT") {
            toast.warning(
              "You don't have access to the website. Please log in using Artylearning mobile app."
            );
          } else {
            // Proceed with login for other roles
            toast.success(response.data.message);
            sessionStorage.setItem("roleId", response.data.roleId);
            sessionStorage.setItem("token", response.data.accessToken);
            sessionStorage.setItem("userId", response.data.userId);
            sessionStorage.setItem("userName", response.data.role);
            sessionStorage.setItem("loginUserId", response.data.loginUserId);
            sessionStorage.setItem("studentCareId", response.data.studentCareId);
            onLogin(response.data.roleId);
            navigate("/");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed: " + error.message);
      }

    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ minHeight: "100vh", backgroundColor: "#a5e5e5" }}
    >
      <div className="d-flex justify-content-center  align-items-center my-3">
        <img
          src={logo}
          alt="LOGO"
          className="img-fluid"
          width="50"
          height="50"
        />
        <span className="text-white fs-2 fw-bolder mx-3" style={{ textShadow: '1px 1px 2px black' }}>
          Student Care
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
              <input type="email"
                className={`form-control ${formik.touched.email && formik.errors.email
                  ? "is-invalid"
                  : ""
                  }`}
                style={{ borderRadius: "3px" }}
                placeholder="Enter email"
                {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="mb-2">
              <label className="form-label fw-medium">Password</label>

              <div className={`input-group mb-3`}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                    }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}

              </div>
            </div>


            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-sm btn-button"
                style={{ width: "90px", borderRadius: "10px" }}
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
      </form>
    </div>
  );
}

export default Login;
