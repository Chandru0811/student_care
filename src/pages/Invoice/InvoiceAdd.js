import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../config/URL";
import toast from "react-hot-toast";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";
import fetchAllStudentCaresWithIds from "../List/CenterList";

export default function InvoiceAdd() {
  const [rows, setRows] = useState([{}]);
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    studentCareId: Yup.string().required("*Select a Centre"),
    parent: Yup.string().required("*Parent is required"),
    // studentId: Yup.string().required("*Select a Student"),
    course: Yup.string().required("*Select a course"),
    schedule: Yup.string().required("*Select a schedule"),
    invoiceDate: Yup.string().required("*Invoice Date is required"),
    dueDate: Yup.string().required("*Due Date is required"),
    // packageId: Yup.string().required("*Package is required"),
    invoicePeriodTo: Yup.string().required("*Invoice Period To is required"),
    invoicePeriodFrom: Yup.string().required(
      "*Invoice Period From is required"
    ),
    receiptAmount: Yup.number()
      .required("*Receipt Amount is required")
      .typeError("*Must be a Number"),
  });

  const formik = useFormik({
    initialValues: {
      studentCareId: "",
      parent: "",
      studentId: "",
      course: "",
      schedule: "",
      noOfLessons: "",
      remarks: "",
      invoiceDate: "",
      dueDate: "",
      packageId: null,
      invoicePeriodTo: "",
      invoicePeriodFrom: "",
      receiptAmount: "",
      creditAdviceOffset: "",
      gst: "",
      totalAmount: "",
      invoiceItems: [
        {
          item: "",
          itemAmount: "",
          taxType: "",
          gstAmount: "",
          totalAmount: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        // Prepare the payload to send to the API
        const payload = {
          generateInvoice: {
            studentCareId: values.studentCareId,
            parent: values.parent,
            studentId: values.studentId,
            courseId: values.course,
            schedule: values.schedule,
            invoiceDate: values.invoiceDate,
            dueDate: values.dueDate,
            packageId: values.packageId,
            noOfLessons: values.noOfLessons,
            invoicePeriodFrom: values.invoicePeriodFrom,
            invoicePeriodTo: values.invoicePeriodTo,
            gst: parseFloat(values.gst), // Ensure numerical values are parsed correctly
            creditAdviceOffset: parseFloat(values.creditAdviceOffset), // Ensure numerical values are parsed correctly
            totalAmount: parseFloat(values.totalAmount), // Ensure numerical values are parsed correctly
            remarks: values.remarks,
            receiptAmount: parseFloat(values.receiptAmount), // Ensure numerical values are parsed correctly
          },
          invoiceItemsList: values.invoiceItems.map((item) => ({
            item: item.item,
            itemAmount: parseFloat(item.itemAmount), // Ensure numerical values are parsed correctly
            taxType: item.taxType,
            gstAmount: parseFloat(item.gstAmount), // Ensure numerical values are parsed correctly
            totalAmount: parseFloat(item.totalAmount), // Ensure numerical values are parsed correctly
          })),
        };

        // Send the request to the API
        const response = await api.post("/generateInvoice", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/invoice");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Ensure error.message is rendered as a string
        const errorMessage =
          error.message || "An error occurred while submitting the form";
        toast.error(errorMessage);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllStudentCaresWithIds();
      console.log(centerData);
      setCenterData(centerData);
    } catch (error) {
      toast.error(error); // Ensure error.message is rendered as a string
    }
  };

  const fetchCourses = async (studentCareId) => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(studentCareId);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error.message); // Ensure error.message is rendered as a string
    }
  };

  const fetchPackage = async (studentCareId) => {
    try {
      const packageData = await fetchAllPackageListByCenter(studentCareId);
      setPackageData(packageData);
    } catch (error) {
      toast.error(error.message); // Ensure error.message is rendered as a string
    }
  };

  const fetchStudent = async (studentCareId) => {
    try {
      const student = await fetchAllStudentListByCenter(studentCareId);
      setStudentData(student);
    } catch (error) {
      toast.error(error.message); // Ensure error.message is rendered as a string
    }
  };

  const handleCenterChange = (event) => {
    setCourseData(null);
    setPackageData(null);
    setStudentData(null);
    const studentCareId = event.target.value;
    formik.setFieldValue("studentCareId", studentCareId);
    fetchCourses(studentCareId);
    fetchPackage(studentCareId);
    fetchStudent(studentCareId);
  };

  // Function to calculate total amount based on item amount and GST
  const calculateTotalAmount = (itemAmount, gst) => {
    const totalAmount = parseFloat(itemAmount) * (1 + parseFloat(gst) / 100);
    return totalAmount.toFixed(2); // Round to 2 decimal places
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Inside your component function
  useEffect(() => {
    // Calculate total Item Amounts
    const totalItemAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.itemAmount || 0),
      0
    );
    formik.setFieldValue("creditAdviceOffset", totalItemAmount.toFixed(2));

    // Calculate total Gst
    const totalGst = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.gstAmount || 0),
      0
    );
    formik.setFieldValue("gst", totalGst.toFixed(2));

    // Calculate total Amount
    const totalAmount = formik.values.invoiceItems.reduce(
      (total, item) => total + parseFloat(item.totalAmount || 0),
      0
    );
    formik.setFieldValue("totalAmount", totalAmount.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.invoiceItems]);

  return (
    <div className="container-fluid center">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 mb-2 top-header">
          <div className="my-3 d-flex justify-content-between">
            <div className="ms-3">
              <h2>Add Invoice</h2>
            </div>
            <div>
              <Link to="/invoice">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button btn-sm me-3"
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
        <div className="container card shadow border-0 mb-2 top-header p-5">
          <div className="row py-4">
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Centre<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("studentCareId")}
                  name="studentCareId"
                  className={`form-select form-select-sm ${
                    formik.touched.studentCareId && formik.errors.studentCareId
                      ? "is-invalid"
                      : ""
                  }`}
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
                {formik.touched.studentCareId &&
                  formik.errors.studentCareId && (
                    <div className="invalid-feedback">
                      {formik.errors.studentCareId}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Parent<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("parent")}
                  className={`form-control form-control-sm  ${
                    formik.touched.parent && formik.errors.parent
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.parent && formik.errors.parent && (
                  <div className="invalid-feedback">{formik.errors.parent}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Student<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("studentId")}
                  className={`form-select form-select-sm ${
                    formik.touched.studentId && formik.errors.studentId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="" selected></option>
                  {studentData &&
                    studentData.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.studentNames}
                      </option>
                    ))}
                </select>
                {formik.touched.studentId && formik.errors.studentId && (
                  <div className="invalid-feedback">
                    {formik.errors.studentId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Course<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("course")}
                  className={`form-select form-select-sm ${
                    formik.touched.course && formik.errors.course
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="" selected></option>
                  {courseData &&
                    courseData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseNames}
                      </option>
                    ))}
                </select>
                {formik.touched.course && formik.errors.course && (
                  <div className="invalid-feedback">{formik.errors.course}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Schedule<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("schedule")}
                  className={`form-control form-control-sm  ${
                    formik.touched.schedule && formik.errors.schedule
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.schedule && formik.errors.schedule && (
                  <div className="invalid-feedback">
                    {formik.errors.schedule}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  No Of Lessons
                </label>
                <br />
                <input
                  {...formik.getFieldProps("noOfLessons")}
                  className={`form-control form-control-sm  ${
                    formik.touched.noOfLessons && formik.errors.noOfLessons
                      ? "is-invalid"
                      : ""
                  }`}
                  type="number"
                />
                {formik.touched.noOfLessons && formik.errors.noOfLessons && (
                  <div className="invalid-feedback">
                    {formik.errors.noOfLessons}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Remarks
                </label>
                <br />
                <textarea
                  {...formik.getFieldProps("remarks")}
                  className={`form-control form-control-sm  ${
                    formik.touched.remarks && formik.errors.remarks
                      ? "is-invalid"
                      : ""
                  }`}
                  rows="3"
                ></textarea>
                {formik.touched.remarks && formik.errors.remarks && (
                  <div className="invalid-feedback">
                    {formik.errors.remarks}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Date<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoiceDate")}
                  className={`form-control form-control-sm  ${
                    formik.touched.invoiceDate && formik.errors.invoiceDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoiceDate && formik.errors.invoiceDate && (
                  <div className="invalid-feedback">
                    {formik.errors.invoiceDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Due Date<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("dueDate")}
                  className={`form-control form-control-sm  ${
                    formik.touched.dueDate && formik.errors.dueDate
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.dueDate && formik.errors.dueDate && (
                  <div className="invalid-feedback">
                    {formik.errors.dueDate}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Package<span className="text-danger">*</span>
                </label>
                <br />
                <select
                  {...formik.getFieldProps("packageId")}
                  className={`form-select form-select-sm ${
                    formik.touched.packageId && formik.errors.packageId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="" selected></option>
                  {packageData &&
                    packageData.map((packages) => (
                      <option key={packages.id} value={packages.id}>
                        {packages.packageNames}
                      </option>
                    ))}
                </select>
                {formik.touched.packageId && formik.errors.packageId && (
                  <div className="invalid-feedback">
                    {formik.errors.packageId}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period From<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoicePeriodFrom")}
                  className={`form-control form-control-sm  ${
                    formik.touched.invoicePeriodFrom &&
                    formik.errors.invoicePeriodFrom
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodFrom &&
                  formik.errors.invoicePeriodFrom && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodFrom}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Invoice Period To<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("invoicePeriodTo")}
                  className={`form-control form-control-sm  ${
                    formik.touched.invoicePeriodTo &&
                    formik.errors.invoicePeriodTo
                      ? "is-invalid"
                      : ""
                  }`}
                  type="date"
                />
                {formik.touched.invoicePeriodTo &&
                  formik.errors.invoicePeriodTo && (
                    <div className="invalid-feedback">
                      {formik.errors.invoicePeriodTo}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Receipt Amount<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("receiptAmount")}
                  className={`form-control form-control-sm  ${
                    formik.touched.receiptAmount && formik.errors.receiptAmount
                      ? "is-invalid"
                      : ""
                  }`}
                  type="number"
                />
                {formik.touched.receiptAmount &&
                  formik.errors.receiptAmount && (
                    <div className="invalid-feedback">
                      {formik.errors.receiptAmount}
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="text-start mt-5">
                <label htmlFor="" className="mb-1 fw-medium">
                  Credit Advice Offset
                </label>
                <br />
                <input
                  {...formik.getFieldProps("creditAdviceOffset")}
                  className={`form-control form-control-sm  ${
                    formik.touched.creditAdviceOffset &&
                    formik.errors.creditAdviceOffset
                      ? "is-invalid"
                      : ""
                  }`}
                  type="number"
                  readOnly
                />
                {formik.touched.creditAdviceOffset &&
                  formik.errors.creditAdviceOffset && (
                    <div className="invalid-feedback">
                      {formik.errors.creditAdviceOffset}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  GST
                </label>
                <br />
                <input
                  {...formik.getFieldProps("gst")}
                  className={`form-control form-control-sm  ${
                    formik.touched.gst && formik.errors.gst ? "is-invalid" : ""
                  }`}
                  type="number"
                  readOnly
                />
                {formik.touched.gst && formik.errors.gst && (
                  <div className="invalid-feedback">{formik.errors.gst}</div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Total Amount
                </label>
                <br />
                <input
                  {...formik.getFieldProps("totalAmount")}
                  className={`form-control form-control-sm  ${
                    formik.touched.totalAmount && formik.errors.totalAmount
                      ? "is-invalid"
                      : ""
                  }`}
                  type="number"
                  readOnly
                />
                {formik.touched.totalAmount && formik.errors.totalAmount && (
                  <div className="invalid-feedback">
                    {formik.errors.totalAmount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Item */}
        <div className="container card shadow border-0 mb-2 top-header p-5">
          {formik.values.invoiceItems.map((item, index) => (
            <div className="row pb-4" key={index}>
              <div className="col-lg-12 col-md-12 col-12 mb-3">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    const items = [...formik.values.invoiceItems];
                    items.splice(index, 1);
                    formik.setFieldValue("invoiceItems", items);
                  }}
                >
                  <IoIosCloseCircleOutline
                    size={24}
                    className="cursor-pointer"
                  />
                </button>
              </div>
              <div className="col-lg-3 col-md-6 col-12 mb-3">
                <label className="fw-medium">Item</label>
                <input
                  type="text"
                  name={`invoiceItems[${index}].item`}
                  value={item.item}
                  onChange={formik.handleChange}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12 mb-3">
                <label className="fw-medium">Item Amount</label>
                <input
                  type="number"
                  name={`invoiceItems[${index}].itemAmount`}
                  value={item.itemAmount}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const updatedItemAmount = parseFloat(e.target.value) || 0;
                    const gstRate = parseFloat(item.taxType) || 0;
                    const gstAmount = (updatedItemAmount * gstRate) / 100;
                    const totalAmount = updatedItemAmount + gstAmount;
                    const updatedInvoiceItems = [...formik.values.invoiceItems];
                    updatedInvoiceItems[index] = {
                      ...updatedInvoiceItems[index],
                      gstAmount: gstAmount.toFixed(2),
                      totalAmount: totalAmount.toFixed(2),
                    };
                    formik.setFieldValue("invoiceItems", updatedInvoiceItems);
                  }}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-lg-2 col-md-6 col-12 mb-3">
                <label className="fw-medium">Tax Type</label>
                <select
                  name={`invoiceItems[${index}].taxType`}
                  value={item.taxType}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const taxRate = parseFloat(e.target.value) || 0;
                    const updatedItemAmount = parseFloat(item.itemAmount) || 0;
                    const gstAmount = (updatedItemAmount * taxRate) / 100;
                    const totalAmount = updatedItemAmount + gstAmount;
                    const updatedInvoiceItems = [...formik.values.invoiceItems];
                    updatedInvoiceItems[index] = {
                      ...updatedInvoiceItems[index],
                      gstAmount: gstAmount.toFixed(2),
                      totalAmount: totalAmount.toFixed(2),
                    };
                    formik.setFieldValue("invoiceItems", updatedInvoiceItems);
                  }}
                  className="form-select form-select-sm"
                >
                  <option value="0">0%</option>
                  <option value="7">7%</option>
                  <option value="19">19%</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-6 col-12 mb-3">
                <label className="fw-medium">GST Amount</label>
                <input
                  type="number"
                  name={`invoiceItems[${index}].gstAmount`}
                  value={item.gstAmount}
                  onChange={formik.handleChange}
                  className="form-control form-control-sm"
                  readOnly
                />
              </div>
              <div className="col-lg-2 col-md-6 col-12 mb-3">
                <label className="fw-medium">Total Amount</label>
                <input
                  type="number"
                  name={`invoiceItems[${index}].totalAmount`}
                  value={item.totalAmount}
                  onChange={formik.handleChange}
                  className="form-control form-control-sm"
                  readOnly
                />
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  formik.setFieldValue("invoiceItems", [
                    ...formik.values.invoiceItems,
                    {
                      item: "",
                      itemAmount: "",
                      taxType: "",
                      gstAmount: "",
                      totalAmount: "",
                    },
                  ])
                }
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
