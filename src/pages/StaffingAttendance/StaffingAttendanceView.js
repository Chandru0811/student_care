import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllStudentCaresWithIds from "../List/CenterList";
import fetchAllTeachersWithIds from "../List/TeacherList";
import toast from "react-hot-toast";


function StaffingAttendanceView() {

  const [data, setData] = useState([]);
  console.log('Attendance Datas:', data);
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllStudentCaresWithIds();
      const teacherData = await fetchAllTeachersWithIds();
      setCenterData(centerData);
      setTeacherData(teacherData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllAttendanceById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, []);

  return (
    <div className="container-fluid center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h2 className="h2 ls-tight headingColor">View Attendance</h2>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/staffing/attendance">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="card shadow border-0 mb-2 top-header minHeight">
          <div className="container p-5">
            <div className="row mt-5 pb-3">
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Centre Name </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {centerData &&
                        centerData.map((studentCareId) =>
                          parseInt(data.studentCareId) === studentCareId.id
                            ? studentCareId.studentCareName || "--"
                            : ""
                        )}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Employee Name </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.employeeName || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row  mb-2  ">
                  <div className="col-6  ">
                    <p className="fw-medium">Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.date || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Attendance Status </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.attendanceStatus || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Check In</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.checkIn || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Check Out</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.checkOut || "--"}</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkInMode || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkOutMode || "--"}</p>
                </div>
              </div>
            </div> */}
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Mode Of Working</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.modeOfWorking || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">OT Start Time</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.otStartTime || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">OT End Time</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.otEndTime || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row    mb-2">
                  <div className="col-6 ">
                    <p className="fw-medium">Attendance Remark</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.attendanceRemark || "--"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffingAttendanceView;
