import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function ClientAdd() {
  const validationSchema = Yup.object({
    clientName: Yup.string().required("*Client Name is required"),
    clientPhone: Yup.string()
      .required("*Phone is required")
      .matches(/^[0-9]{10}$/, "*Phone number must be 10 digits"),
    emailID: Yup.string().email().required("*Email is required"),
    clientOwner: Yup.string().required("*Client Owner is required"),
  });

  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientPhone: "",
      emailID: "",
      clientOwner: "",
      city: "",
      street: "",
      state: "",
      zip: "",
      country: "",
      comments: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Client Datas:", values);
    },
  });

  return (
    <div className="container-fluid minHeight m-0">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor">Create Client</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/clients">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 my-2">
          <div className="row mt-3 me-2">
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-button">
                Save
              </button>
            </div>
          </div>

          {/* Client Information */}
          <div className="container fw-bold fs-5 my-4">Client Information</div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Client Name<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="clientName"
                    className={`form-control  ${
                      formik.touched.clientName && formik.errors.clientName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("clientName")}
                  />
                  {formik.touched.clientName && formik.errors.clientName && (
                    <div className="invalid-feedback">
                      {formik.errors.clientName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Phone<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="clientPhone"
                    className={`form-control  ${
                      formik.touched.clientPhone && formik.errors.clientPhone
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("clientPhone")}
                  />
                  {formik.touched.clientPhone && formik.errors.clientPhone && (
                    <div className="invalid-feedback">
                      {formik.errors.clientPhone}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Client Owner<span className="text-danger">*</span>
                </lable>
                <select
                  name="clientOwner"
                  {...formik.getFieldProps("clientOwner")}
                  className={`form-select    ${
                    formik.touched.clientOwner && formik.errors.clientOwner
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected></option>
                  <option value="User1">User1</option>
                  <option value="User2">User2</option>
                  <option value="User3">User3</option>
                  <option value="User4">User4</option>
                </select>
                {formik.touched.clientOwner && formik.errors.clientOwner && (
                  <div className="invalid-feedback">
                    {formik.errors.clientOwner}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Email ID<span className="text-danger">*</span>
                </lable>
                <div className="mb-3">
                  <input
                    type="text"
                    name="emailID"
                    className={`form-control  ${
                      formik.touched.emailID && formik.errors.emailID
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("emailID")}
                  />
                  {formik.touched.emailID && formik.errors.emailID && (
                    <div className="invalid-feedback">
                      {formik.errors.emailID}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="container fw-bold fs-5 mt-3">Address Information</div>
          <div className="container mb-5">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">City</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    {...formik.getFieldProps("city")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Street</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    {...formik.getFieldProps("street")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Zip/Postal Code</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control "
                    name="zip"
                    {...formik.getFieldProps("zip")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">State/Province</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control "
                    name="state"
                    {...formik.getFieldProps("state")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Country</lable>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control "
                    name="country"
                    {...formik.getFieldProps("country")}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Comments</lable>
                <div className="mb-3">
                  <textarea
                    type="text"
                    rows={6}
                    className="form-control "
                    name="comments"
                    {...formik.getFieldProps("comments")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClientAdd;
