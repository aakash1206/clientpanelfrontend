import React, { useEffect, useState } from "react";
import Form from "./Form";
import Clients from "./Clients";
import Header from "./Header";
import axios from "axios";

const Dashboard = () => {
  const [client, setClients] = useState([]);
  const [getClientId, setGetClientId] = useState("");
  let getdata = async () => {
    try {
      const res = await axios("http://localhost:5000/client/get-all-clients");
      if (res.data.success) {
        setClients(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);



  return (
    <>
      <Header />
      <div className="dash-borde-wrapper">
        <div className="container">
          <div className="row">
            <Clients client={client} getdata={getdata} setGetClientId = {setGetClientId} />
            <Form getdata={getdata} getClientId = {getClientId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
