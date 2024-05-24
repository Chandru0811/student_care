import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  workingDays: Yup.string().required("*Working Days is required"),
  userContractSalary: Yup.number()
    .typeError("*Salary Must be numbers")
    .notRequired(),
  uen: Yup.number().typeError("*UEN Must be numbers").notRequired(),
  nric: Yup.number().typeError("*NRIC Must be numbers").notRequired(),
  allowance: Yup.number().typeError("*Allowance Must be numbers").notRequired(),
});

const StaffContractEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        employer: "",
        uen: "",
        addressOfEmployment: "",
        employee: "",
        nric: "",
        userContractAddress: "",
        jobTitle: "",
        mainDuties: "",
        startDateOfEmployment: "",
        training: "",
        allowance: "",
        userContractStartDate: "",
        contactPeriod: "",
        probation: "",
        workingDays: "",
        userContractSalary: "",
        salaryStartDate: "",
        userContractEndDate: "",
        payNow: "",
        internetBanking: "",
        contractDate: "",
        terminationNotice: "",
      },
      // onSubmit: async (data) => {
      //   try {
      //     const response = await api.put(
      //       `/updateUserContractCreation/${data.contractId}`,
      //       data,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     if (response.status === 200) {
      //       toast.success(response.data.message);
      //       setFormData((prv) => ({ ...prv, ...data }));
      //       navigate("/staff");
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        // console.log("Api Data:", values);
        try {
          if (values.contractId !== null) {
            const response = await api.put(
              `/updateUserContractCreation/${values.contractId}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              navigate("/staff");
            } else {
              toast.error(response.data.message);
            }
          } else {
            const response = await api.post(
              `/createUserContractCreation/${formData.staff_id}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              navigate("/staff");
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUsersById/${formData.staff_id}`
          );
          if (
            response.data.userContractCreationModels &&
            response.data.userContractCreationModels.length > 0
          ) {
            const contractData = response.data.userContractCreationModels[0];
            formik.setValues({
              ...contractData,
              contractId: contractData.id,
              startDateOfEmployment: contractData.startDateOfEmployment
                ? contractData.startDateOfEmployment.substring(0, 10)
                : "",
              userContractStartDate: contractData.userContractStartDate
                ? contractData.userContractStartDate.substring(0, 10)
                : "",
              workingDays: contractData.workingDays
                ? contractData.workingDays.substring(0, 10)
                : "",
              userContractEndDate: contractData.userContractEndDate
                ? contractData.userContractEndDate.substring(0, 10)
                : "",
              contractDate: contractData.contractDate
                ? contractData.contractDate.substring(0, 10)
                : "",
              salaryStartDate: contractData.salaryStartDate
                ? contractData.salaryStartDate.substring(0, 10)
                : "",
            });
          } else {
            formik.setValues({
              contractId: null,
              employer: "",
              uen: "",
              addressOfEmployment: "",
              employee: "",
              nric: "",
              userContractAddress: "",
              jobTitle: "",
              mainDuties: "",
              startDateOfEmployment: "",
              training: "",
              allowance: "",
              userContractStartDate: "",
              contactPeriod: "",
              probation: "",
              workingDays: "",
              userContractSalary: "",
              salaryStartDate: "",
              userContractEndDate: "",
              payNow: "",
              internetBanking: "",
              contractDate: "",
              terminationNotice: "",
            });
            console.log("Contract ID:", formik.values.contractId);
          }
        } catch (error) {
          toast.error("Error Fetching Data");
        }
      };
      console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      staffContractEdit: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <p className="headColor my-4">Contract Information</p>
          <div className="container mt-5" style={{ minHeight: "95vh" }}>
            <span className="mt-3 fw-bold">Details of EMPLOYER</span>
            <div class="row mt-4">
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Employer</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="employer"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employer}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>UEN</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="uen"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.uen}
                />
                {formik.touched.uen && formik.errors.uen && (
                  <div className="error text-danger ">
                    <small>{formik.errors.uen}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Address of Employment</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="addressOfEmployment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addressOfEmployment}
                />
              </div>
            </div>

            <div class="row mt-3 ">
              <span className="mt-3 fw-bold ">Details of EMPLOYEE</span>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Employee</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="employee"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employee}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>NRIC</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="nric"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nric}
                />
                {formik.touched.nric && formik.errors.nric && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nric}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="userContractAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractAddress}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Job Title</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="jobTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobTitle}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Main Duties</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="mainDuties"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mainDuties}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Start Date of Employment</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="startDateOfEmployment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDateOfEmployment}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Training</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="training"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.training}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Allowance</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="allowance"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.allowance}
                />
                {formik.touched.allowance && formik.errors.allowance && (
                  <div className="error text-danger ">
                    <small>{formik.errors.allowance}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract Start Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="userContractStartDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractStartDate}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract Period</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="contactPeriod"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactPeriod}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Porbation</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="probation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.probation}
                />
              </div>
              {/* <div class="col-md-6 col-12 mb-2 mt-3">
              <label>
                Working Days<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control form-control-sm"
                name="workingDays"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workingDays}
              />
              {formik.touched.workingDays && formik.errors.workingDays && (
                <div className="error text-danger ">
                  <small>{formik.errors.workingDays}</small>
                </div>
              )}
            </div> */}
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Working Days<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select form-select-sm ${
                    formik.touched.workingDays && formik.errors.workingDays
                      ? "is-invalid"
                      : ""
                  }`}
                  name="workingDays"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.workingDays}
                >
                  <option></option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
                {formik.touched.workingDays && formik.errors.workingDays && (
                  <div className="invalid-feedback">
                    {formik.errors.workingDays}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Salary</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="userContractSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractSalary}
                />
                {formik.touched.userContractSalary &&
                  formik.errors.userContractSalary && (
                    <div className="error text-danger ">
                      <small>{formik.errors.userContractSalary}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Salary Start Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="salaryStartDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salaryStartDate}
                />
              </div>
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>Contract End Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="userContractEndDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userContractEndDate}
                />
              </div>
              <div class="row mt-3">
                <span className="mt-3 fw-bold">Bank Account Details</span>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Pay Now</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="payNow"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.payNow}
                  />
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Internet Banking</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="internetBanking"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.internetBanking}
                  />
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Contract Date</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="contractDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contractDate}
                  />
                </div>
                <div class="col-md-6 col-12 mb-2 mt-3">
                  <label>Termination Notice</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="terminationNotice"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.terminationNotice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default StaffContractEdit;
