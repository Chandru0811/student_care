import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
// import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import toast from "react-hot-toast";
import DeleteModel from "../../components/common/DeleteModel";
// import { SCREENS } from "../../config/ScreenFilter";

const Staff = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUsersByRole/staff");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
      }
    };
    getData();
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
      const response = await api.get("/getAllUsersByRole/staff");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
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
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid px-0">
              <div className="my-3 d-flex justify-content-between px-4 mb-5">
                {/* {storedScreens?.staffCreate && ( */}
                <h2>Staff</h2>
                <Link to="/staff/add">
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i class="bx bx-plus"></i>
                  </button>
                </Link>
                {/* )} */}
              </div>
              <hr />
              <div className="table-response px-4">
                <table ref={tableRef} className="display minHeight">
                  <thead>
                    <tr>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        S No
                      </th>
                      <th scope="col">Staff Id</th>
                      <th scope="col">Staff Name</th>
                      <th scope="col">Staff Type</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {data.userAccountInfoModels?.length > 0 &&
                            data.userAccountInfoModels[0].teacherId}
                        </td>
                        {/* <td>{data.teacherId}</td> */}
                        <td>{data.teacherName}</td>
                        <td>
                          {data.userAccountInfoModels?.length > 0 &&
                            data.userAccountInfoModels[0].teacherType}
                        </td>
                        <td>
                          {data.userContactInfoModels?.length > 0 &&
                            data.userContactInfoModels[0].contactNumber}
                        </td>
                        <td>
                          {data.userAccountInfoModels?.length > 0 &&
                          data.userAccountInfoModels[0].status === "Active" ? (
                            <span className="badge badges-Green">Active</span>
                          ) : (
                            <span className="badge badges-Red ">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex">
                            {/* {storedScreens?.staffRead && ( */}
                            <Link to={`/staff/view/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEye />
                              </button>
                            </Link>
                            {/* )}
                            {storedScreens?.staffUpdate && ( */}
                            <Link to={`/staff/edit/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </Link>
                            {/* )} */}
                            {/* {storedScreens?.staffDelete && ( */}
                            <DeleteModel
                              onSuccess={refreshData}
                              path={`/deleteUser/${data.id}`}
                            />
                            {/* )} */}
                          </div>
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

export default Staff;
