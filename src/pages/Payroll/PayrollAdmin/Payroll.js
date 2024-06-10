import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/DeleteModel";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import fetchAllStudentCaresWithIds from "../../List/CenterList";

const Payroll = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllStudentCaresWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("getAllPayroll");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error.message);
      }
    };
    getData();
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("getAllPayroll");
      setDatas(response.data);
      // initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="container-fluid  center">
          <div className="card shadow border-0 mb-2 top-header minHeight">
            <div className="container-fluid px-0">
              <div className="my-3 d-flex justify-content-between mb-5 px-4">
                {/* {storedScreens?.subjectCreate && ( */}
                <h2>Class</h2>
                <Link to="/payrolladmin/add">
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i class="bx bx-plus"></i>
                  </button>
                </Link>
                {/* )} */}
              </div>
              <hr />
              <div className="table-responsive px-4">
                <table ref={tableRef} className="display">
                  <thead>
                    <tr>
                      <th scope="col">S No</th>
                      <th scope="col">Centre Name</th>
                      <th scope="col">Emplopee Name</th>
                      <th scope="col">Bonus</th>
                      {/* <th scope="col">Gross Pay</th> */}
                      {/* <th scope="col">Deduction</th> */}
                      <th scope="col">Net Pay</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {centerData &&
                            centerData.map((center) =>
                              parseInt(data.studentCareId) === center.id
                                ? center.studentCareName || "--"
                                : ""
                            )}
                        </td>
                        <td>{data.employeeName}</td>
                        <td>{data.bonus}</td>
                        {/* <td>{data.grossPay}</td>*/}
                        {/* <td>{data.deduction}</td> */}
                        <td>{data.netPay}</td>
                        <td>
                          {data.status === "APPROVED" ? (
                            <span className="badge badges-Green">Approved</span>
                          ) : data.status === "PENDING" ? (
                            <span className="badge badges-Yellow">Pending</span>
                          ) : (
                            <span className="badge badges-Red">Rejected</span>
                          )}
                        </td>
                        <td>
                          {/* {storedScreens?.payrollRead && ( */}
                            <Link to={`/payrolladmin/view/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEye />
                              </button>
                            </Link>
                          {/* )}
                          {storedScreens?.payrollUpdate && ( */}
                            <Link to={`/payrolladmin/edit/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </Link>
                          {/* )}
                          {storedScreens?.payrollDelete && ( */}
                            <Delete
                              onSuccess={refreshData}
                              path={`/deleteUserPayroll/${data.id}`}
                              style={{ display: "inline-block" }}
                            />
                          {/* )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
