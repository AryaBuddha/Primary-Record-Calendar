import React from "react";

import { Modal } from "antd";

const AppleModal = ({ isModalVisible, setIsModalVisible }) => {
  return (
    <div style={{ visibility: isModalVisible ? "visible" : "hidden" }}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  );
};

export default AppleModal;
