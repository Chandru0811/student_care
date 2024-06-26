import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
// import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import toast from "react-hot-toast";
import DeleteModel from "../../components/common/DeleteModel";

const Center = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllStudentCares");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
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
      const response = await api.get("/getAllStudentCares");
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
              <h2>Centre</h2>
               {storedScreens?.studentCareListingCreate && ( 
             
                <Link to="/center/add">
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i class="bx bx-plus"></i>
                  </button>
                </Link>
                 )} 
              </div>
              <hr />
              <div className="table-responsive px-4 minHeight">
                <table ref={tableRef} className="display ">
                  <thead>
                    <tr>
                      <th scope="col" style={{ whiteSpace: "nowrap" }}>
                        S No
                      </th>
                      <th scope="col">Centre Name</th>
                      <th scope="col">Centre Manager</th>
                      <th scope="col">Code</th>
                      <th scope="col">UEN Number</th>
                      <th scope="col">Mobile</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.studentCareName}</td>
                        <td>{data.studentCareManager}</td>
                        <td>{data.code}</td>
                        <td>{data.uenNumber}</td>
                        <td>{data.mobile}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center ">
                           {storedScreens?.studentCareListingCreate && ( 
                            <div
                              class="dropdown"
                              style={{ display: "inline-block" }}
                            >
                              <button
                                class="btn dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <IoMdAdd />
                              </button>
                              <ul class="dropdown-menu">
                                <li>
                                  <AddRegister
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                </li>
                                <li style={{ width: "100%" }}>
                                  <AddBreak
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                </li>
                                <li style={{ width: "100%" }}>
                                  <AddClass
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                </li>
                                <li style={{ width: "100%" }}>
                                  <AddPackage
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                </li>
                              </ul>
                            </div>
                           )}
                            {storedScreens?.studentCareListingRead && ( 
                            <Link
                              to={`/center/view/${data.id}`}
                              style={{ display: "inline-block" }}
                            >
                              <button className="btn btn-sm">
                                <FaEye />
                              </button>
                            </Link>
                         )}
                            {storedScreens?.studentCareListingUpdate && ( 
                            <Link
                              to={`/center/edit/${data.id}`}
                              style={{ display: "inline-block" }}
                            >
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </Link>
                            )} 
                            {storedScreens?.studentCareListingDelete && ( 
                              <DeleteModel
                                onSuccess={refreshData}
                                path={`/deleteStudentCare/${data.id}`}
                                style={{ display: "inline-block" }}
                              />
                             )}
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

export default Center;
