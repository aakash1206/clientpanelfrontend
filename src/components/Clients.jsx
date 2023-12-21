import axios from "axios";
import React, { useState } from "react";

const Clients = ({ client, getdata  , setGetClientId}) => {
  let deleteClientHandler = async (id) => {
    try {
      const deleted = axios.delete(`http://localhost:5000/client/delete/${id}`);
      console.log(deleted);
      if ((await deleted).data.success) {
        getdata();
      }
    } catch (error) {
      console.log(error);
    }
  };



  let updateClientHandler = (id)=>{
    setGetClientId(id)
  }


  return (
    <>
      <div className="col-md-8">
        <h2>Clients </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Project</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {client?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.lastname}</td>
                  <td>{item?.email}</td>
                  <td>{item?.mobile}</td>
                  <td>{item?.project}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary " onClick={()=>updateClientHandler(item._id)}>Edit</button>
                      <button
                        onClick={() => {
                          deleteClientHandler(item._id);
                        }}

                        className="btn btn-primary"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Clients;
