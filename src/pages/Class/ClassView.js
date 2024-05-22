import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
// import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
// import fetchAllCoursesWithIds from "../List/CourseList";

function ClassView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const fetchData = async () => {
    // try {
    //   const centerData = await fetchAllCentersWithIds();
    //   const courseData = await fetchAllCoursesWithIds();
    //   setCenterData(centerData);
    //   setCourseData(courseData);
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseClassListingsById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    getData();
    fetchData();
  }, [id]);

  return (
    <div className="minHeight container-fluid  center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h2 className="h2 ls-tight headingColor">View Class</h2>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/class">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container card shadow border-0 mb-2 top-header">
        <div className="row mt-5 pb-3">
          <div className="col-md-6 col-12">
            <div className="row mt-3  mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Centre Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  :{" "}
                  {centerData &&
                    centerData.map((centerId) =>
                      parseInt(data.centerId) === centerId.id
                        ? centerId.centerNames || "--"
                        : ""
                    )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 mt-3">
              <div className="col-6  ">
                <p className="fw-medium">Course</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  :{" "}
                  {courseData &&
                    courseData.map((courseId) =>
                      parseInt(data.courseId) === courseId.id
                        ? courseId.courseNames || "--"
                        : ""
                    )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Class Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.className || ""}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Class Type</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.classType || ""}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Duration(Hr)</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.durationInHrs || ""}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Remarks</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.remark || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassView;
