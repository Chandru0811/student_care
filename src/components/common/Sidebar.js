import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav } from "react-bootstrap";
import "../../styles/sidebar.css";
import Logo from "../../assets/Logo.png";

function Sidebar({ onLogout }) {
  const handleLogOutClick = () => {
    onLogout();
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const storedScreens = {
      centerListingIndex: true,
      levelIndex: true,
      subjectIndex: true,
      courseIndex: true,
      classIndex: true,
      leadListingIndex: true,
      enrollmentIndex: true,
      staffIndex: true,
      teacherIndex: true,
      staffAttendanceIndex: true,
      leaveAdminIndex: true,
      leaveIndex: true,
      holidayIndex: true,
      deductionIndex: true,
      payrollIndex: false,
      payslipIndex: true,
      rolesMatrixIndex: true,
      studentListingIndex: true,
      attendanceIndex: true,
      scheduleTeacherIndex: true,
      documentListingIndex: true,
      documentFileIndex: true,
      invoiceIndex: true,
      paymentIndex: true,
      documentReportIndex: true,
      attendanceReportIndex: true,
      studentReportIndex: false,
      assessmentReportIndex: true,
      enrollmentReportIndex: true,
      feeCollectionReportIndex: true,
      packageBalanceReportIndex: true,
      salesRevenueReportindex: true,
      replaceClassLessonListindex: false,
    };

    const updatedMenuItems = [
      {
        title: "Centre Management",
        icon: "bx bx-building",
        isOpen: false,
        subMenus: [
          {
            title: "Centre Listing",
            path: "/center",
            access: storedScreens.centerListingIndex,
          },
        ],
      },
      {
        title: "Course Management",
        icon: "bx bx-book-alt",
        isOpen: false,
        subMenus: [
          { title: "Level", path: "/level", access: storedScreens.levelIndex },
          {
            title: "Subject",
            path: "/subject",
            access: storedScreens.subjectIndex,
          },
          {
            title: "Course",
            path: "/course",
            access: storedScreens.courseIndex,
          },
          { title: "Class", path: "/class", access: storedScreens.classIndex },
        ],
      },
      {
        title: "Lead Management",
        icon: "bx bx-pie-chart-alt-2",
        isOpen: false,
        subMenus: [
          {
            title: "Lead Listing",
            path: "lead/lead",
            access: storedScreens.leadListingIndex,
          },
          // {
          //   title: "Enrollment",
          //   path: "/lead/enrollment",
          //   access: storedScreens.enrollmentIndex,
          // },
        ],
      },
      {
        title: "Staffing",
        icon: "bx bx-female",
        isOpen: false,
        subMenus: [
          {
            title: "Staff",
            path: "/staff",
            access: storedScreens.staffIndex,
          },
          {
            title: "Teacher",
            path: "/teacher",
            access: storedScreens.teacherIndex,
          },
          {
            title: "Attendance",
            path: "/staffing/attendance",
            access: storedScreens.staffAttendanceIndex,
          },
          {
            title: "Leave",
            path: "/leaveadmin",
            access: storedScreens.leaveAdminIndex,
          },
          {
            title: "Leave Request",
            path: "/leave",
            access: storedScreens.leaveIndex,
          },
          {
            title: "Holiday",
            path: "/holiday",
            access: storedScreens.holidayIndex,
          },
          {
            title: "Deduction",
            path: "/deduction",
            access: storedScreens.deductionIndex,
          },
          {
            title: "Payroll",
            path: "/payrolladmin",
            access: storedScreens.payrollIndex,
          },
          {
            title: "Payslip",
            path: "/employeepayslip",
            access: storedScreens.payslipIndex,
          },
          {
            title: "Role & Matrix",
            path: "/role/add",
            access: storedScreens.rolesMatrixIndex,
          },
        ],
      },
      {
        title: "Student Management",
        icon: "bx bx-book-reader",
        isOpen: false,
        subMenus: [
          {
            title: "Student Listing",
            path: "/studentlisting",
            access: storedScreens.studentListingIndex,
          },
          {
            title: "Attendance",
            path: "/attendance",
            access: storedScreens.attendanceIndex,
          },
        ],
      },
      {
        title: "Schedule",
        icon: "bx bx-alarm-add",
        isOpen: false,
        subMenus: [
          {
            title: "Time Schedule",
            path: "/scheduleteacher",
            access: storedScreens.scheduleTeacherIndex,
          },
        ],
      },
      // {
      //   title: "Document Management",
      //   icon: "bx bx-folder-open",
      //   isOpen: false,
      //   subMenus: [
      //     {
      //       title: "Document Folder",
      //       path: "/document",
      //       access: storedScreens.documentListingIndex,
      //     },
      //     {
      //       title: "Document Files",
      //       path: "/documentfile",
      //       access: storedScreens.documentFileIndex,
      //     },
      //   ],
      // },
      {
        title: "Invoice and Payment",
        icon: "bx bx-spreadsheet",
        isOpen: false,
        subMenus: [
          {
            title: "Invoice",
            path: "/invoice",
            access: storedScreens.invoiceIndex,
          },
          {
            title: "Payment",
            path: "/payment",
            access: storedScreens.paymentIndex,
          },
        ],
      },

      {
        title: "Report Management",
        icon: "bx bx-food-menu",
        isOpen: false,
        subMenus: [
          {
            title: "Document Report",
            path: "/report/document",
            access: storedScreens.documentReportIndex,
          },
          {
            title: "Attendance Report",
            path: "/report/attendance",
            access: storedScreens.attendanceReportIndex,
          },
          {
            title: "Student Report",
            path: "/report/studentreport",
            access: storedScreens.studentReportIndex,
          },
          {
            title: "Assessment Report",
            path: "/report/assessment",
            access: storedScreens.assessmentReportIndex,
          },
          {
            title: "Enrolment Report",
            path: "/report/enrolment",
            access: storedScreens.enrollmentReportIndex,
          },
          {
            title: "Fee Collection Report",
            path: "/report/fee",
            access: storedScreens.feeCollectionReportIndex,
          },
          {
            title: "Package Balance Report",
            path: "/report/package",
            access: storedScreens.packageBalanceReportIndex,
          },
          {
            title: "Sales Revenue Report",
            path: "/report/sales",
            access: storedScreens.salesRevenueReportindex,
          },
          {
            title: "Replace Class Lesson List",
            path: "/report/replace_class",
            access: storedScreens.replaceClassLessonListindex,
          },
        ],
      },
    ];

    setMenuItems(updatedMenuItems);
  }, []);

  const handleMenuClick = (index) => {
    if (index === null) {
      setMenuItems(menuItems.map((item) => ({ ...item, isOpen: false })));
      setActiveMenu(null);
    } else {
      const updatedMenuItems = menuItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isOpen: !item.isOpen,
          };
        } else {
          return {
            ...item,
            isOpen: false,
          };
        }
      });
      setMenuItems(updatedMenuItems);
      setActiveMenu(
        updatedMenuItems[index].isOpen ? updatedMenuItems[index].title : null
      );
    }
  };

  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
      style={{ backgroundColor: "#DFCCFB" }}
      id="navbarVertical"
    >
      <div className="container-fluid sidebar">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink
          // style={{ background: "#024166b7" }}
          className="navbar-brand logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center"
          to="/"
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <span
            className="text-white fs-3 mx-3"
            style={{ textShadow: "1px 1px 2px black" }}
          >
            Student Care
          </span>
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul
            className="nav-links"
            style={{ listStyle: "none", paddingLeft: 0 }}
          >
            <NavLink to="/" onClick={() => handleMenuClick(null)}>
              <li className="py-2 px-4 nav-link">
                <i
                  className="bx bx-grid-alt me-3"
                  style={{ color: "#ffff" }}
                ></i>
                <span className="links_name" style={{ color: "#fff" }}>
                  Home
                </span>
              </li>
            </NavLink>

            {menuItems.map(
              (item, index) =>
                item.subMenus.some((subMenu) => subMenu.access) && (
                  <li key={index}>
                    <Nav.Link
                      to="#"
                      onClick={() => handleMenuClick(index)}
                      className={activeMenu === item.title ? "active" : ""}
                    >
                      <div
                        className="w-100 d-flex justify-content-between"
                        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                      >
                        <span>
                          <i className={item.icon}></i>
                          <span className="links_name">{item.title}</span>
                        </span>
                        <span>
                          <i
                            className={`bx bx-chevron-down arrow ${
                              item.isOpen ? "open" : "closed"
                            }`}
                            style={{
                              paddingRight: "5px",
                              minWidth: "0px",
                              fontWeight: "700",
                            }}
                          ></i>
                        </span>
                      </div>
                    </Nav.Link>
                    <Collapse in={item.isOpen}>
                      <ul className="submenu">
                        {item.subMenus.map(
                          (subMenu, subIndex) =>
                            subMenu.access && (
                              <li key={subIndex}>
                                <NavLink
                                  to={subMenu.path}
                                  className="links_name circle-submenu ps-8"
                                  activeClassName="active-submenu"
                                >
                                  <i className="bx bx-radio-circle-marked icon-bg-clr"></i>
                                  <span className="links_name links_names">
                                    {subMenu.title}
                                  </span>
                                </NavLink>
                              </li>
                            )
                        )}
                      </ul>
                    </Collapse>
                  </li>
                )
            )}

            <NavLink
              to="/sendNotification"
              onClick={() => handleMenuClick(null)}
            >
              <li className="nav-link py-2 px-4">
                <i className="bx bx-send me-3"></i>
                <span className="links_name">Send Notification</span>
              </li>
            </NavLink>
          </ul>

          <div style={{ marginTop: "20%" }}>
            <div
              className="my-5  border-top-1"
              style={{ border: "1px solid #87878761" }}
            />
          </div>

          <button className="nav-link exit ps-2" to="#">
            <i className="bi bi-person-square me-2"></i> Account
          </button>
          <button
            to="#"
            className="nav-link exit ps-1"
            onClick={handleLogOutClick}
          >
            <i className="bi bi-box-arrow-left me-2"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
