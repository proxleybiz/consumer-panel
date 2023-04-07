import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "next/router";
import Loading from "../components/Loading";
import userContext from "../context/user/userContext";
import MyNavbar from "../components/MyNavbar";

function Products() {
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(userContext);
  useEffect(() => {}, []);
  return (
    <div className="min-vh-100">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-100">
          <MyNavbar />
        </div>
      )}
    </div>
  );
}

export default withRouter(Products);
