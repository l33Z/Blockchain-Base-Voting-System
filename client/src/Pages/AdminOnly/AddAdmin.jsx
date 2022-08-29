import { useState, useEffect } from "react";
import "./AddAdmin.css";
import AdminSideNavbar from "../../Components/AdminSideNavbar";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCandidates = () => {
  const navigate = useNavigate();
  const [Renderd, setRenderd] = useState(false);

  //////////////////////////////// CHECK AUTHENTICATION //////////////////////////////////
  const checkAuthentication = async () => {
    try {
      const response = await fetch("/api/admin/addadmin", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (response.status === 200) {
        setRenderd(true);
      } else if (response.status === 401) {
        navigate("/login");
        setTimeout(function () {
          toast.error(data, {
            style: {
              fontSize: "15px",
              letterSpacing: "1px",
            },
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      } else {
        throw new Error(response.error);
      }
    } catch (e) {
      console.log(e);
    }
  };
  var zz = true;
  useEffect(() => {
    if (zz) {
      checkAuthentication();
      zz = false;
    }
  }, []);

  const [AdminDetails, setAdminDetails] = useState({
    adminname: "",
    adminusername: "",
    adminpass: "",
    admincpass: "",
  });

  //////////////////////////////// HANDLE CHANGES FUNCTION //////////////////////////////////
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdminDetails({ ...AdminDetails, [name]: value });
  };

  //////////////////////////////// RESET METHODS ////////////////////////////////
  const resetBtnFunc = () => {
    const { adminname, adminusername, adminpass, admincpass } = AdminDetails;
    if (
      adminname !== "" ||
      adminusername !== "" ||
      adminpass !== "" ||
      admincpass !== ""
    ) {
      setAdminDetails({
        adminname: "",
        adminusername: "",
        adminpass: "",
        admincpass: "",
      });
    }
  };

  //////////////////////////////// SUBMIT FUNCTION //////////////////////////////////
  const RegisersCanFunc = async (e) => {
    e.preventDefault();
    const { adminname, adminusername, adminpass, admincpass } = AdminDetails;
    if (
      adminname !== "" &&
      adminusername !== "" &&
      adminpass !== "" &&
      admincpass !== ""
    ) {
      if (adminpass !== admincpass) {
        toast.error("Passwords are not matching !!", {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const response = await fetch("/api/admin/addadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminname,
          username: adminusername,
          password: adminpass,
          cpassword: admincpass,
        }),
      });

      const data = await response.json();

      /////////USERNAME ALREADY EXISTS //////////////////////
      if (response.status === 409) {
        toast.error(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      /////////USERNAME ALREADY EXISTS //////////////////////
      else if (response.status === 201) {
        toast.success(data, {
          style: {
            fontSize: "15px",
            letterSpacing: "1px",
          },
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Fill All Details !!", {
        style: {
          fontSize: "15px",
          letterSpacing: "1px",
        },
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      {Renderd && (
        <>
          <AdminSideNavbar />
          <div className="addAdminContainer">
            <ToastContainer theme="colored" />
            <div className="addAdminMain">
              <h1>Add New Admin</h1>
              <div className="addAdmininputFormMain">
                <form
                  method="POST"
                  className="addAdminForm"
                  encType="multipart/form-data"
                >
                  <div className="addAdminInputBox">
                    <i className="fa-solid fa-user-large"></i>
                    <input
                      type="text"
                      name="adminname"
                      placeholder="Enter Admin Name"
                      autoComplete="off"
                      className="addAdminInput"
                      onChange={handleChanges}
                      value={AdminDetails.adminname}
                      required
                    />
                  </div>

                  <div className="addAdminInputBox">
                    <i className="fa-solid fa-at"></i>
                    <input
                      type="text"
                      name="adminusername"
                      placeholder="Enter Admin Username"
                      autoComplete="off"
                      className="addAdminInput"
                      onChange={handleChanges}
                      value={AdminDetails.adminusername}
                      required
                    />
                  </div>

                  <div className="addAdminInputBox">
                    <i className="fa-solid fa-key"></i>

                    <input
                      name="adminpass"
                      type="password"
                      placeholder="Enter Password "
                      autoComplete="off"
                      className="addAdminInput"
                      onChange={handleChanges}
                      value={AdminDetails.adminpass}
                      required
                    />
                  </div>

                  <div className="addAdminInputBox">
                    <i className="fa-solid fa-key"></i>

                    <input
                      name="admincpass"
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      className="addAdminInput"
                      onChange={handleChanges}
                      value={AdminDetails.admincpass}
                      required
                    />
                  </div>

                  <div className="canFormbtnGrp">
                    <input
                      type="submit"
                      className="regiterCanBtn"
                      onClick={RegisersCanFunc}
                    />
                    <input
                      type="reset"
                      className="resetCanBtn"
                      onClick={resetBtnFunc}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddCandidates;
