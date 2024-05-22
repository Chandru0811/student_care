import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import DeleteModel from "../../components/common/DeleteModel";

const Clients = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      clientName: "Ragul",
      phone: "9876543210",
      email: "ragul0123@gmail.com",
    },
    {
      id: 2,
      clientName: "Antony",
      phone: "9012345678",
      email: "antony1234@gmail.com",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container-fluid minHeight">
      <div className="card shadow border-0 mb-2 top-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Clients</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/clients/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Create Clients</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 my-2">
        <div className="table-responsive p-2 minHeight">
          <table
            ref={tableRef}
            className="display table table-hover table-nowrap"
          >
            <thead className="thead-light">
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  S.NO
                </th>
                <th scope="col">CLIENT NAME</th>
                <th scope="col" className="text-start">
                  PHONE
                </th>
                <th scope="col">EMAIL ID</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{data.clientName}</td>
                  <td className="text-start">{data.phone}</td>
                  <td>{data.email}</td>
                  <td className="text-center">
                    <Link to="/clients/view">
                      <button className="btn btn-sm ps-0 shadow-none border-none">
                        <FaEye />
                      </button>
                    </Link>
                    <Link to="/clients/edit">
                      <button className="btn btn-sm shadow-none border-none">
                        <FaEdit />
                      </button>
                    </Link>
                    <DeleteModel />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  );
};

export default Clients;
