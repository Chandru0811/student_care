import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
// import fetchAllCentersWithIds from "../List/CenterList";
// import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
// import fetchAllLevelsWithIds from "../List/LevelList";

function CourseView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // const [centerData, setCenterData] = useState(null);
  // const [subjectData, setSubjectData] = useState(null);
  // const [levelData, setLevelData] = useState(null);

  const fetchData = async () => {
    // try {
    //   const centerData = await fetchAllCentersWithIds();
    //   const subjectData = await fetchAllSubjectsWithIds();
    //   const levelData = await fetchAllLevelsWithIds();
    //   setCenterData(centerData);
    //   setSubjectData(subjectData);
    //   setLevelData(levelData);
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/getAllCoursesById/${id}`);
  //       setData(response.data);
  //     } catch (error) {
  //       toast.error("Error Fetching Data ", error);
  //     }
  //   };
  //   getData();
  //   fetchData();
  // }, [id]);

  return (
    <div className="container-fluid  center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h2 className="h2 ls-tight headingColor">View Course</h2>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/course">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container card shadow border-0 mb-2 top-header minHeight">
        <div className="row mt-5 pb-3">
          <div className="col-md-6 col-12">
            <div className="row mt-3  mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Centre Name</p>
              </div>
              <div className="col-6">
                {/* <p className="text-muted text-sm">
                    :{" "}
                    {centerData &&
                      centerData.map((centerId) =>
                        parseInt(data.centerId) === centerId.id
                          ? centerId.centerNames || "--"
                          : ""
                      )}
                  </p> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2 mt-3">
              <div className="col-6">
                <p className="fw-medium">Course Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.courseName}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Course Code</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.courseCode}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Subject</p>
              </div>
              <div className="col-6">
                {/* <p className="text-muted text-sm">
                    :{" "}
                    {subjectData &&
                      subjectData.map((subjectId) =>
                        parseInt(data.subjectId) === subjectId.id
                          ? subjectId.subjects || "--"
                          : ""
                      )}
                  </p> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Level</p>
              </div>
              <div className="col-6">
                {/* <p className="text-muted text-sm">
                    :{" "}
                    {levelData &&
                      levelData.map((levelId) =>
                        parseInt(data.levelId) === levelId.id
                          ? levelId.levels || "--"
                          : ""
                      )}
                  </p> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Min Class Size</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.minClassSize}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Max Class Size</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.maxClassSize}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Replacement Lesson Student Buffer</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.replacementLessonStudentBuffer}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Color Code</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.colorCode}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Course Type</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.courseType}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Duration(Hr)</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.durationInHrs}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Duration(Mins)</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.durationInMins}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.status}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Class Replacement Allowed</p>
              </div>
              <div className="col-6">
                {/* <p className="text-muted text-sm">
                    : {data.classReplacementAllowed}
                  </p> */}
                <p className="text-muted text-sm">
                  : {data.classReplacementAllowed ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Description</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseView;
