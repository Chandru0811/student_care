import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../config/URL";

function Viewpayroll() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  // console.log("View Data", data);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`getAllPayrollById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error.message);
      }
    };
    getData();
  }, [id]);

  return (
    <div className="container">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h2 className="h2 ls-tight headingColor">View Payroll</h2>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/payrolladmin">
                  <button type="submit" className="btn btn-sm btn-light">
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container card shadow border-0 mb-2 top-header"
        style={{ height: "70vh" }}
      >
        <div className="row mt-5">
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Centre Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.studentCareName || "--"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Employee Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.employeeName || "--"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Payroll Month</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.payrollMonth || "--"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Gross Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.grossPay || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Bonus</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.bonus || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Deduction</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : {data.deductionAmount || "0"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Net Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.netPay || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.status || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewpayroll;
