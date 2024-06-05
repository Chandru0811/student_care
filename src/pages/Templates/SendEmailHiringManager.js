import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend, IoMdClose } from "react-icons/io";

// import user from "../../assets/user.png";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { API_URL } from "../../Config/URL";

// const role = sessionStorage.getItem("role");
// const token = sessionStorage.getItem("token");

function SendEmailHiringManager(toEmail) {
  const [show, setShow] = useState(false);

  const userName = sessionStorage.getItem("user_name");
  const userEmail = sessionStorage.getItem("email");
  const [setSubject] = useState("");
  const [setMainBody] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const handleShow = () => setShow(true);
  const handleHide = () => {
    setSelectedFile(null);
    setShow(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // const sendEmail = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("toMail", "chandru08112000@gmail.com");
  //     formData.append("fromMail", userEmail);
  //     formData.append("subject", subject);
  //     formData.append("body", mainBody);
  //     formData.append("attachment", selectedFile);

  //     const response = await axios.post(
  //       `${API_URL}sendMailWithAttachment`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Set the content type
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //       toast.success("Mail Send Successfully");
  //       handleHide();
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <button
        onClick={handleShow}
        type="button"
        className="btn btn-sm border-none shadow-none p-0"
      >
        Hiring Manager
      </button>
      <Offcanvas
        show={show}
        onHide={handleHide}
        className="emailHeader"
        placement="end"
      >
        <Offcanvas.Header>
          Send To Hiring Manager &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <button
            onClick={handleHide}
            className="btn border-none shadow-none "
            style={{ color: "#fff", fontSize: "20px" }}
          >
            <IoMdClose />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            className="d-flex align-items-center pb-3"
            style={{ gap: "10px", borderBottom: "1px solid #d4d4d3" }}
          >
            {/* <img className="img-fluid" src={user} width={40} alt="user" /> */}
            <p style={{ marginBottom: "0px" }}>
              {userName || "User01"} ( {userEmail || "user01@gmail.com"} )
            </p>
          </div>
          <div
            className="d-flex align-items-center py-3"
            style={{ gap: "10px", borderBottom: "1px solid #d4d4d3" }}
          >
            <p style={{ marginBottom: "0px" }}>
              <b style={{ color: "#424242" }}>To :</b>
            </p>
            <p style={{ marginBottom: "0px" }}>{toEmail.toEmail}</p>
          </div>
          <div
            className="d-flex align-items-center py-3"
            style={{ gap: "10px", borderBottom: "1px solid #d4d4d3" }}
          >
            <input
              type="text"
              className="form-control"
              name="subject"
              id="subject"
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
              style={{ border: "none" }}
            />
          </div>
          <div
            className="d-flex align-items-center py-3"
            style={{ gap: "10px", borderBottom: "1px solid #d4d4d3" }}
          >
            <textarea
              className="form-control"
              placeholder="Mail Body"
              onChange={(e) => setMainBody(e.target.value)}
              style={{ height: "250px", border: "none" }}
            ></textarea>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span
              style={{ minHeight: "80px", gap: "10px" }}
              className="d-flex align-items-center"
            >
              <span>
                <label
                  htmlFor="file-input"
                  className="btn btn-button sendMail px-3 py-2"
                >
                  <GrAttachment />
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept=".jpg, .jpeg, .png, .gif"
                />
              </span>
            </span>
            <span className="d-flex" style={{ gap: "10px" }}>
              <button className="btn btn-primary">
                Send
                <IoMdSend className="ms-2 mb-1" />
              </button>
            </span>
          </div>
          {selectedFile && (
            <p className="mt-2" style={{ marginBottom: "0px" }}>
              File selected: {selectedFile.name}
            </p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SendEmailHiringManager;
