import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import fetchAllStudentCaresWithIds from "../List/CenterList";
import toast from "react-hot-toast";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import api from "../../config/URL";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";

function ScheduleTeacherAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setCourseData(null);
    setClassData(null);
    setTeacherData(null);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const centers = await fetchAllStudentCaresWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTeacher = async (centerId) => {
    try {
      const teacher = await fetchAllTeacherListByCenter(centerId);
      setTeacherData(teacher);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchClasses = async (studentCareId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(studentCareId);
      setClassData(classes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const fetchTeacher = async (teacherId) => {
  //   try {
  //     const teachers = await fetchAllTeachersWithIdsC(teacherId);
  //     setClassData(teachers);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const validationSchema = Yup.object({
    studentCareId: Yup.string().required("*Centre is required"),
    courseId: Yup.string().required("*Course  is required"),
    classId: Yup.string().required("*Class is required"),
    days: Yup.string().required("*Days is required"),
    // userId: Yup.string().required("*Teacher is required"),
    // batch: Yup.string().required("*From Time is required"),
  });

  const formik = useFormik({
    initialValues: {
      studentCareId: "",
      courseId: "",
      classId: "",
      days: "",
      userId: "",
      // batch: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // const batch12hr = convertTo12Hour(values.batch);
      // values.batch = batch12hr;
      setLoadIndicator(true);
      let selectedCenterName = "";
      let selectedClassName = "";
      let selectedCourseName = "";
      let selectedTeacherName = "";

      centerData.forEach((center) => {
        if (parseInt(values.studentCareId) === center.id) {
          selectedCenterName = center.studentCareName || "--";
        }
      });

      // Find selected class name
      classData.forEach((cls) => {
        if (parseInt(values.classId) === cls.id) {
          selectedClassName = cls.classNames || "--";
        }
      });

      // Find selected course name
      courseData.forEach((course) => {
        if (parseInt(values.courseId) === course.id) {
          selectedCourseName = course.courseNames || "--";
        }
      });

      teacherData.forEach((teacher) => {
        if (parseInt(values.userId) === teacher.id) {
          selectedTeacherName = teacher.teacherNames || "--";
        }
      });

      let requestBody = {
        studentCareId: values.studentCareId,
        studentCareName: selectedCenterName,
        className: selectedClassName,
        classId: values.classId,
        course: selectedCourseName,
        courseId: values.courseId,
        // batch: batch12hr,
        userId: values.userId,
        teacher: selectedTeacherName,
        days: values.days,
      };

      // console.log(requestBody);
      try {
        const response = await api.post(
          "createMultipleSchedulesWithBatches",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          // onSuccess();
          handleClose();
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

  const handleCenterChange = (event) => {
    setCourseData(null);
    setClassData(null);
    setTeacherData(null);
    const studentCareId = event.target.value;
    formik.setFieldValue("studentCareId", studentCareId);
    fetchCourses(studentCareId);
    fetchTeacher(studentCareId); // Fetch courses for the selected center
  };

  const handleCourseChange = (event) => {
    setClassData(null);
    const courseId = event.target.value;
    formik.setFieldValue("courseId", courseId);
    fetchClasses(courseId); // Fetch class for the selected center
  };

  // const handleClassChange = (event) => {
  //   const teacherId = event.target.value;
  //   formik.setFieldValue("class", teacherId);
  //   fetchTeacher(teacherId); // Fetch teacher for the selected center
  // };

  // const convertTo12Hour = (time24h) => {
  //   let [hours, minutes] = time24h.split(":");
  //   let modifier = "AM";

  //   if (parseInt(hours) >= 12) {
  //     modifier = "PM";
  //     hours = (parseInt(hours) - 12).toString();
  //   }

  //   if (hours === "0") {
  //     hours = "12";
  //   }

  //   return `${hours}:${minutes} ${modifier}`;
  // };

  return (
    <>
      <button
        type="button"
        className="btn btn-button btn-sm"
        onClick={handleShow}
      >
        Add
      </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add Schedule Teacher</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
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
                    <option></option>
                    {centerData &&
                      centerData.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.studentCareName}
                        </option>
                      ))}
                  </select>
                  {formik.touched.studentCareId && formik.errors.studentCareId && (
                    <div className="invalid-feedback">
                      {formik.errors.studentCareId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Course<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("courseId")}
                    class={`form-select form-select-sm  ${
                      formik.touched.courseId && formik.errors.courseId
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleCourseChange}
                  >
                    <option></option>
                    {courseData &&
                      courseData.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.courseNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.courseId && formik.errors.courseId && (
                    <div className="invalid-feedback">
                      {formik.errors.courseId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2 d-flex flex-column justify-content-end">
                  <label className="form-label">
                    Class<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("classId")}
                    class={`form-select form-select-sm  ${
                      formik.touched.classId && formik.errors.classId
                        ? "is-invalid"
                        : ""
                    }`}
                    // onChange={handleClassChange}
                  >
                    <option></option>
                    {classData &&
                      classData.map((classes) => (
                        <option key={classes.id} value={classes.id}>
                          {classes.classNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.classId && formik.errors.classId && (
                    <div className="invalid-feedback">
                      {formik.errors.classId}
                    </div>
                  )}
                </div>

                {/* <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Batch <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className={`form-control  ${
                      formik.touched.batch && formik.errors.batch
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("batch")}
                  />

                  {formik.touched.batch && formik.errors.batch && (
                    <div className="invalid-feedback">
                      {formik.errors.batch}
                    </div>
                  )}
                </div> */}
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Days<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("days")}
                    class={`form-select form-select-sm  ${
                      formik.touched.days && formik.errors.days
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option></option>
                    <option value="MONDAY">MONDAY</option>
                    <option value="TUESDAY">TUESDAY</option>
                    <option value="WEDNESDAY">WEDNESDAY</option>
                    <option value="THURSDAY">THURSDAY</option>
                    <option value="FRIDAY">FRIDAY</option>
                    <option value="SATURDAY">SATURDAY</option>
                    <option value="SUNDAY">SUNDAY</option>
                  </select>
                  {formik.touched.days && formik.errors.days && (
                    <div className="invalid-feedback">{formik.errors.days}</div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Teacher<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("userId")}
                    class={`form-select form-select-sm  ${
                      formik.touched.userId && formik.errors.userId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option></option>
                    {teacherData &&
                      teacherData.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.teacherNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.userId && formik.errors.userId && (
                    <div className="invalid-feedback">
                      {formik.errors.userId}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button
                type="button"
                variant="secondary btn-sm"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
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
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default ScheduleTeacherAdd;
