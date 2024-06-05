import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import fetchAllCentersWithIds from "../../List/CenterList";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";

function HolidayAdd() {

  const validationSchema = Yup.object({
    // centerId: Yup.string().required("*Center Name is required"),
    holidayName: Yup.string().required("*Holiday Name is required"),
    startDate: Yup.string().required("*Select the start date"),
    endDate: Yup.string().required("*Select the end date"),
    holidayDescription: Yup.string().required(
      "*Holiday Description is required"
    ),
  });

  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQb29tYSIsImlhdCI6MTcxNzU2ODI4NywiZXhwIjoxNzIyNzUyMjg3fQ.3GVVYl1M96t8b-86el8Kfz6MQcakZtC7XPt4qwFW6uvuKE4kojMNrqpGf-g_Uv0FedCCUNcyCcImHDZKLLO_KQ";

  const formik = useFormik({
    initialValues: {
      centerId: "",
      holidayName: "",
      startDate: "",
      endDate: "",
      holidayDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // setLoadIndicator(true);
      console.log(values);
      try {
        const payload = {
          // centerId: values.centerId,
          holidayName: values.holidayName,
          startDate: values.startDate,
          endDate: values.endDate,
          holidayDescription: values.holidayDescription,
        };
        const response = await api.post("creteHoliday", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/holiday");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(
          error.message || "An error occurred while submitting the form"
        );
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid center">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h2 className="h2 ls-tight headingColor">Add Holiday </h2>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-end">
                  <Link to="/holiday">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
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
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow border-0 mb-2 top-header minHeight">
          <div className="container p-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Center Name<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("centerId")}
                    name="centerId"
                    className={`form-select form-select-sm ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected disabled></option>
                    {centerData &&
                      centerData.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.centerNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Holiday Name<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control form-control-sm  ${
                      formik.touched.holidayName && formik.errors.holidayName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("holidayName")}
                  />
                  {formik.touched.holidayName && formik.errors.holidayName && (
                    <div className="invalid-feedback">
                      {formik.errors.holidayName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Start Date<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    className={`form-control form-control-sm  ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("startDate")}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="invalid-feedback">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    End Date<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    className={`form-control form-control-sm  ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("endDate")}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="invalid-feedback">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Description<span className="text-danger">*</span>
                  </lable>
                  <textarea
                    type="text"
                    rows={5}
                    className={`form-control form-control-sm  ${
                      formik.touched.holidayDescription &&
                      formik.errors.holidayDescription
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("holidayDescription")}
                  />
                  {formik.touched.holidayDescription &&
                    formik.errors.holidayDescription && (
                      <div className="invalid-feedback">
                        {formik.errors.holidayDescription}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HolidayAdd;
