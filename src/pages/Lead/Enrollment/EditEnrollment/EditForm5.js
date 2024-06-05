import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
// import fetchAllCentersWithIds from "../../../List/CenterList";
import api from "../../../../config/URL";

const validationSchema = Yup.object().shape({
  centerId: Yup.string().required("*Center is required!"),
  // preferredDay: Yup.array().of(Yup.string().required("*Select Days")),
  preferredDay: Yup.array()
    .min(1, "*Select at least one preferred day!")
    .required("Select Preferred day"),
  enquiryDate: Yup.string().required("*Enquiry Date is required!"),
});

const EditForm5 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [centerData, setCenterData] = useState(null);

    const formik = useFormik({
      initialValues: {
        centerId: formData.centerId,
        preferredDay: formData.preferredDay || "",
        enquiryDate: formData.enquiryDate || "",
        marketingSource: formData.marketingSource || "",
        referBy: formData.referBy || "",
        nameOfReferral: formData.nameOfReferral || "",
        referedStudentCenterNameId: formData.referedStudentCenterNameId || "",
        remark: formData.remark || "",
        preferredTimeSlot: formData.preferredTimeSlot || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const fetchData = async () => {
      // try {
      //   const centerData = await fetchAllCentersWithIds();
      //   setCenterData(centerData);
      // } catch (error) {
      //   toast.error(error);
      // }
    };

    // const getData = async () => {
    //   const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
    //   const enquiryDate =
    //     response.data.enquiryDate && response.data.enquiryDate.substring(0, 10);

    //   formik.setValues({
    //     ...response.data,
    //     enquiryDate: enquiryDate,
    //   });
    // };

    // useEffect(() => {
    //   getData();
    //   fetchData();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useImperativeHandle(ref, () => ({
    //   editform5: formik.handleSubmit,
    // }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div className="row px-1">
              <div className="py-3">
                <p className="headColor">Account Information</p>
              </div>

              <div className="col-md-6 col-12 ">
                <lable className="">
                  Center<span className="text-danger">*</span>
                </lable>
                <select
                  className="form-select form-select-sm"
                  name="centerId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.centerId}
                >
                  <option selected></option>
                  {centerData &&
                    centerData.map((centerId) => (
                      <option key={centerId.id} value={centerId.id}>
                        {centerId.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="error text-danger">
                    <small>{formik.errors.centerId}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2 ps-3">
                <lable>
                  Preferrded Day
                  <span className="text-danger">*</span>
                </lable>
                <div className="gap-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preferredDay"
                      value="MONDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("MONDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox1"
                    >
                      Monday
                    </label>
                  </div>
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preferredDay"
                      value="TUESDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("TUESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox1"
                    >
                      Tuesday
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preferredDay"
                      value="WEDNESDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("WEDNESDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox2"
                    >
                      Wednesday
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      name="preferredDay"
                      value="THURSDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("THURSDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox3"
                    >
                      Thursday
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preferredDay"
                      value="FRIDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("FRIDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox2"
                    >
                      Friday
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      name="preferredDay"
                      value="SATURDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("SATURDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox3"
                    >
                      Saturday
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      name="preferredDay"
                      value="SUNDAY"
                      checked={
                        formik.values.preferredDay &&
                        formik.values.preferredDay.includes("SUNDAY")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox3"
                    >
                      Sunday
                    </label>
                  </div>
                </div>
                {formik.touched.preferredDay && formik.errors.preferredDay && (
                  <div className="error text-danger ">
                    <small>{formik.errors.preferredDay}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2 ps-3">
                <lable>
                  Preferrded Timeslot
                  <span className="text-danger">*</span>
                </lable>
                <div className="gap-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preferredTimeSlot"
                      value="3PM - 6PM"
                      checked={
                        formik.values.preferredTimeSlot &&
                        formik.values.preferredTimeSlot.includes("3PM - 6PM")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox1"
                    >
                      3PM - 6PM
                    </label>
                  </div>
                  <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      name="preferredTimeSlot"
                      value="6PM - 10PM"
                      checked={
                        formik.values.preferredTimeSlot &&
                        formik.values.preferredTimeSlot.includes("6PM - 10PM")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label mx-1"
                      for="inlineCheckbox1"
                    >
                      6PM - 10PM
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preferredTimeSlot"
                      value="9AM - 12PM"
                      checked={
                        formik.values.preferredTimeSlot &&
                        formik.values.preferredTimeSlot.includes("9AM - 12PM")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox2"
                    >
                      9AM - 12PM
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      name="preferredTimeSlot"
                      value="12PM - 3PM"
                      checked={
                        formik.values.preferredTimeSlot &&
                        formik.values.preferredTimeSlot.includes("12PM - 3PM")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox3"
                    >
                      12PM - 3PM
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      name="preferredTimeSlot"
                      value="3AM - 6AM"
                      checked={
                        formik.values.preferredTimeSlot &&
                        formik.values.preferredTimeSlot.includes("3AM - 6AM")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      className="form-check-label ms-3"
                      for="inlineCheckbox2"
                    >
                      3AM - 6AM
                    </label>
                  </div>
                </div>
                {formik.touched.preferredTimeSlot &&
                  formik.errors.preferredTimeSlot && (
                    <div className="error text-danger ">
                      <small>{formik.errors.preferredTimeSlot}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12 mb-2"></div>

              <div className="col-md-6 col-12 mb-3">
                <label>Marketing Source</label>
                <div className="input-group ">
                  <select
                    className="form-select form-select-sm"
                    name="marketingSource"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.marketingSource}
                  >
                    <option selected>--Select--</option>
                    <option value="Friends or Relatives">
                      Friends or Relatives
                    </option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {formik.touched.marketingSource &&
                  formik.errors.marketingSource && (
                    <div className="error text-danger">
                      <small>{formik.errors.marketingSource}</small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label>Referred By</label>
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm"
                    name="referBy"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referBy}
                  />
                </div>
                {formik.touched.referBy && formik.errors.referBy && (
                  <div className="error text-danger">
                    <small>{formik.errors.referBy}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Name of Referal</label>
                <div className="input-group ">
                  <input
                    className="form-control form-control-sm"
                    name="nameOfReferral"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nameOfReferral}
                  />
                </div>
                {formik.touched.nameOfReferral &&
                  formik.errors.nameOfReferral && (
                    <div className="error text-danger">
                      <small>{formik.errors.nameOfReferral}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12">
                <label>
                  Enquiry Date<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="enquiryDate"
                    className="form-control form-control-sm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.enquiryDate}
                  />
                </div>
                {formik.touched.enquiryDate && formik.errors.enquiryDate && (
                  <div className="error text-danger ">
                    <small>{formik.errors.enquiryDate}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label>Refer Student Center</label>
                <div className="input-group ">
                  <select
                    className="form-select form-select-sm"
                    name="referedStudentCenterNameId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referedStudentCenterNameId}
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((referedStudentCenterNameId) => (
                        <option
                          key={referedStudentCenterNameId.id}
                          value={referedStudentCenterNameId.id}
                        >
                          {referedStudentCenterNameId.centerNames}
                        </option>
                      ))}
                  </select>
                </div>
                {formik.touched.referedStudentCenterNameId &&
                  formik.errors.referedStudentCenterNameId && (
                    <div className="error text-danger">
                      <small>{formik.errors.referedStudentCenterNameId}</small>
                    </div>
                  )}
              </div>

              <div className="col-md-6 col-12">
                <label className="form-label">Remarks</label>
                <div className="">
                  <textarea
                    type="text"
                    className="form-control form-control-sm"
                    name="remark"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default EditForm5;
