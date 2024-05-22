import React from "react";
import { Link } from "react-router-dom";

function ClientView() {
  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col">
                <div className="d-flex align-items-center gap-4">
                  <h1 className="h4 ls-tight headingColor">View Clients</h1>
                </div>
              </div>
              <div className="col-auto">
                <div className="hstack gap-2 justify-content-start">
                  <Link to="/clients">
                    <button type="submit" className="btn btn-sm btn-light">
                      <span>Back</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-2 minHeight">
        {/* 
        client Information */}
        <div className="container-fluid fw-bold fs-5 my-2">
          client Information
        </div>
        <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Client Name</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Ragul </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Phone</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 9876543210</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Client Owner</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: user1</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Email ID</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: raghul0123@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="container-fluid fw-bold fs-5 my-2">
          Address Information
        </div>
        <div className="container">
          <div className="row mt-2 p-3">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>City</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Chennai </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Street</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Thousand Lights</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Zip/Postal Code</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 600006 </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>State/Province</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tamil nadu </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Country</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: India</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Comments</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Test</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientView;
