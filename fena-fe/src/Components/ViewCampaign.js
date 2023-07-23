import React, { useEffect, useState } from "react";
import { Card, Alert } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../config/config";

const ViewCampaign = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(`${baseURL}/campaigns/jobs`);

    eventSource.onmessage = (payload) => {
      const parsedData = JSON.parse(payload.data);
      setData(parsedData);
    };

    return () => { eventSource.close(); };
  }, []);

  const deleteCampaign = async (id) => {
    await axios.delete(`${baseURL}/campaigns/${id}`);
  };

  return (
    <>
      <div style={{ width: "100%", marginTop: "20px" }}>
        {data && data.map((item, key) => {
          return (
            <Card key={key} style={{ marginTop: "20px", }} bordered={false} hoverable={true} >
              <Alert message={item.finishedOn ? "Finished" : "Processing"} type={item.finishedOn ? "success" : "info"} showIcon />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }} >
                <div>
                  <h2 style={{ margin: 0, marginTop: "10px" }}>
                    {item.data.name}
                  </h2>
                  <p style={{ marginTop: 0 }}>
                    Emails: {item.progress}/{item.data.quantity}
                  </p>
                </div>
                <div>
                  <DeleteTwoTone
                    onClick={() => deleteCampaign(item.id)}
                    style={{ fontSize: "25px", }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ViewCampaign;
