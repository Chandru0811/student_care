import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/DeleteModel";
import api from "../../config/URL";
import toast from "react-hot-toast";
// import { SCREENS } from "../../config/ScreenFilter";

const Invoice = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  console.log("name :", datas);
  const [loading, setLoading] = useState(true);

  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("getGenerateInvoices");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // toast.error("Error fetching invoice data");
      } finally {
        setLoading(false);
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
      const response = await api.get("getGenerateInvoices");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Error refreshing invoice data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid  center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between px-4 mb-5 my-3">
            <h2>Invoice</h2>
            <Link to="/invoice/add">
              <button type="button" className="btn btn-button btn-sm">
                Add <i class="bx bx-plus"></i>
              </button>
            </Link>
          </div>
          <hr />
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
            <div className="table-responsive px-4">
              <table ref={tableRef} className="display minHeight">
                <thead>
                  <tr>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>
                      S No
                    </th>
                    <th scope="col">Course</th>
                    <th scope="col">Centre</th>
                    <th scope="col">Student</th>
                    <th scope="col">Package</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                       {data.course}
                      </td>
                      <td>
                      {data.center}
                      </td>
                      <td>
                      {data.student}
                      </td>
                      <td>
                      {data.package}
                      </td>
                      <td>
                        <div className="d-flex">
                          {/* {storedScreens?.invoiceRead && ( */}
                          <Link to={`/invoice/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                          {/* )}  */}
                          {/* {storedScreens?.invoiceUpdate && (  */}
                          <Link to={`/invoice/edit/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEdit />
                            </button>
                          </Link>
                          {/* )}  */}
                          {/* {storedScreens?.invoiceDelete && ( */}
                            <Delete
                              onSuccess={refreshData}
                              path={`/deleteGenerateInvoice/${data.id}`}
                            />
                          {/* )} */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
