import React, { useEffect, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { Link, Navigate } from "react-router-dom";

const DropdownButton = () => {

  const [fl,setFl] = useState(true);

  const items = [
    {
      key: "1",
      label: <Link to="/explore/fiction">Fiction</Link>,
    },
    {
      key: "2",
      label: <Link to="/explore/romance">Romance</Link>,
    },
    {
      key: "3",
      label: <Link to="/explore/comic">Comic</Link>,
    },
    {
      key: "4",
      label: <Link to="/explore/textbook">Textbook</Link>,
    },
    {
      key: "5",
      label: <Link to="/explore/crime">Crime</Link>,
    },
  ];

  useEffect(() => {

  },[fl])

  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
      >
        <Space>
          <div className="menuItem">Categories</div>

          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default DropdownButton;
