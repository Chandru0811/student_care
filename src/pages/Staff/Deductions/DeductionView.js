import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
// import fetchAllCentersWithIds from "../../List/CenterList";

function DeductionView() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);

  const fetchData = async () => {
    // try {
    //   const centerData = await fetchAllCentersWithIds();
    //   setCenterData(centerData);
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/getAllUserDeductionById/${id}`);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       toast.error("Error fetching data");
  //     }
  //   };
  //   getData();
  //   fetchData(); // Call fetchData here to fetch center data
  // }, [id]); //   Add <i class="bx bx-plus"></i>id as a dependency

  return (
    <div className="container-fluid center">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h2 className="h2 ls-tight headingColor">View Deduction</h2>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/deduction">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 top-header minHeight">
        <div className="container p-5">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Center Name</p>
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
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Employee Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {""}
                    {data.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Deduction Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Month</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionMonth || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.deductionAmount || "--"}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Total Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.totalDeductionAmount || "--"}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeductionView;
