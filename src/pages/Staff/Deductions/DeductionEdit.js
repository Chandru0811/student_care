import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllStudentCaresWithIds from "../../List/CenterList";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

const validationSchema = Yup.object({
  studentCareId: Yup.string().required("*Center Name is required"),
  userId: Yup.string().required("*Employee Name is required"),
  deductionName: Yup.string().required("*Select the Deduction Name"),
  deductionMonth: Yup.string().required("*Select the Deduction Month"),
  deductionAmount: Yup.string().required("*Deduction Amount is required"),
});

function DeductionEdit() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      studentCareId: "",
      userId: "",
      deductionMonth: "",
      deductionAmount: "",
      deductionName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateDeduction/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/deduction");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const studentCareId = event.target.value;
    formik.setFieldValue("studentCareId", studentCareId);
    try {
      await fetchUserName(studentCareId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const centers = await fetchAllStudentCaresWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserName = async (studentCareId) => {
    try {
      const userNames = await fetchAllEmployeeListByCenter(studentCareId);
      setUserNameData(userNames);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllDeductionById/${id}`);
        formik.setValues(response.data);
        fetchUserName(response.data.studentCareId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, []);

  return (
    <section className="HolidayAdd p-3">
      <div className="minHeight container-fluid  center">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container minHeight">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12 text-end mt-2">
                  <Link to="/deduction">
                    <button type="button" className="btn btn-sm btn-border">
                      Back
                    </button>
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    type="submit"
                    className="btn btn-button btn-sm"
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Update
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6 col-12 mb-3 ">
                  <lable className="">Centre Name</lable>
                  <span className="text-danger">*</span>
                  <select
                    {...formik.getFieldProps("studentCareId")}
                    className={`form-select form-select-sm ${
                      formik.touched.studentCareId && formik.errors.studentCareId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                    onChange={handleCenterChange}
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((studentCareId) => (
                        <option key={studentCareId.id} value={studentCareId.id}>
                          {studentCareId.studentCareName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.studentCareId && formik.errors.studentCareId && (
                    <div className="invalid-feedback">
                      {formik.errors.studentCareId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3 ">
                  <lable className="">Employee Name</lable>
                  <select
                    {...formik.getFieldProps("userId")}
                    class={`form-select form-select-sm  ${
                      formik.touched.userId && formik.errors.userId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected disabled></option>
                    {userNamesData &&
                      userNamesData.map((userName) => (
                        <option key={userName.id} value={userName.id}>
                          {userName.userNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.userId && formik.errors.userId && (
                    <div className="invalid-feedback">
                      {formik.errors.userId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3 ">
                  <lable className="">Deduction Name</lable>
                  <span className="text-danger">*</span>
                  <select
                    {...formik.getFieldProps("deductionName")}
                    className={`form-select form-select-sm ${
                      formik.touched.deductionName &&
                      formik.errors.deductionName
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option value="CPF">CPF</option>
                    <option value="LOP">LOP</option>
                    <option value="LOAN INTEREST">LOAN INTEREST</option>
                  </select>
                  {formik.touched.deductionName &&
                    formik.errors.deductionName && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionName}
                      </div>
                    )}
                </div>

                <div className="col-lg-6 col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      Deduction Month<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="month"
                      className={`form-control form-control-sm ${
                        formik.touched.deductionMonth &&
                        formik.errors.deductionMonth
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("deductionMonth")}
                    />
                    {formik.touched.deductionMonth &&
                      formik.errors.deductionMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.deductionMonth}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      Deduction Amount<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${
                        formik.touched.deductionAmount &&
                        formik.errors.deductionAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("deductionAmount")}
                    />
                    {formik.touched.deductionAmount &&
                      formik.errors.deductionAmount && (
                        <div className="invalid-feedback">
                          {formik.errors.deductionAmount}
                        </div>
                      )}
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Total Deduction Amount<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.totalDeductionAmount &&
                      formik.errors.totalDeductionAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("totalDeductionAmount")}
                  />
                  {formik.touched.totalDeductionAmount &&
                    formik.errors.totalDeductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.totalDeductionAmount}
                      </div>
                    )}
                </div>
              </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeductionEdit;
