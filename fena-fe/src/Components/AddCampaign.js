import React, { useState } from "react";
import { Alert, Button, Card, Form, Input } from "antd";
import axios from "axios";
import { baseURL } from "../config/config";

const AddCampaign = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
    setAlertMessage("");
  };

  const postCampaign = async (values) => {
    setLoading(true);
    setVisible(true);

    const res = await axios.post(`${baseURL}/campaigns`, values);

    setAlertMessage(res.data.message);
    setLoading(false);
  };
  const onFinish = async (values) => {
    postCampaign(values);
    form.resetFields();
  };

  return (
    <Card
      title="Fena Task" bordered={false}
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      {visible && alertMessage && (
        <Alert
          style={{ marginBottom: "10px" }}
          closable
          message={alertMessage}
          afterClose={handleClose}
          type="success"
          showIcon
        />
      )}

      <Form
        form={form}
        name="fena-tasl"
        layout="inline"
        labelCol={{ span: 8, }}
        wrapperCol={{ span: 16, }}
        style={{ maxWidth: 600, }}
        initialValues={{ remember: true, }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="name">
          <Input placeholder="Campaign Name" style={{width:200}} />
        </Form.Item>
        <Form.Item name="quantity">
          <Input type="number" placeholder="Quantity" style={{width:200}} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16, }}        >
          <Button
            disabled={loading}
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            {!loading && "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCampaign;
