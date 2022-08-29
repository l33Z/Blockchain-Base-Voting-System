import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();

  const logOutFunc = async () => {
    const response = await fetch("/api/alogout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status !== 200) {
      throw new Error(response.error);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    logOutFunc();
  }, []);
  return <></>;
};

export default AdminLogout;
