import React, { useState, useEffect } from "react";
import { Form, Input, Select, Image, Popconfirm, Upload, message } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { ModalContent } from "../style";
import moment from "moment";
import { useServiceReqStore } from "../store";
import { logError } from "../../common/Utils";
import ViewCards from "../../common/ViewCards";
import { Collapse } from "antd";
import EditUser from "./EditService";
import FeatherIcon from "feather-icons-react";
import {
  DeleteFilled,
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
//

const { Option } = Select;
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};
const printDocument = () => {
  const input = document.getElementById("content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
};

const ViewService = (props) => {
  const [
    { viewVisible, singleRow },
    { addImages, setVisibleEdit, customerDetails, onImgDelete, onPropertyEdit },
  ] = useServiceReqStore();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isvis, setvis] = useState(false);

  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    customerDetails(props.match.params.id);
  }, []);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange = (info, id) => {
    if (info.file.status !== "uploading") {
      addImages({ images: info.file.originFileObj }, id, props.match.params.id);
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      // addImages({ images: info.file.originFileObj }, id, props.match.params.id);
    }
    // info.file.status='done';
    // addImage({ images: info.file.originFileObj }, id,props.match.params.id);
    // setVisibleEdit()
  };
  console.log(singleRow, "single course");
  return (
    <ModalContent>
       
       <div style={{ padding: "40px", minHeight: "90vh" }}>
       <Cards headless>
        {singleRow?.photo && (
          <ViewCards
            label=""
            value={
              <img
                className="avatar"
                src={process.env.REACT_APP_BASE_API + singleRow?.photo}
              />
            }
          />
        )}
        <h1 style={{ fontSize: "28px", marginBottom: "24px" }}>View Details</h1>
        {/* <div id="content">
          <h1>The title goes here</h1>
          <p>The pararaph goes here</p>
        </div> */}

        <ViewCards
          label="First Name"
          value={
            <span>
              {singleRow?.user?.first_name}
              <a
                onClick={() =>
                  setVisibleEdit({
                    value: true,
                    data: {
                      label: "first_name",
                      val: singleRow?.user?.first_name,
                      type: 1,
                    },
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                Edit
              </a>
            </span>
          }
        />
        <ViewCards
          label="Last Name"
          value={
            <span>
              {singleRow?.user?.last_name}
              <a
                onClick={() =>
                  setVisibleEdit({
                    value: true,
                    data: {
                      label: "last_name",
                      type: 1,
                    },
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                Edit
              </a>
            </span>
          }
        />
        <ViewCards
          label="Email"
          value={
            <span>
              {singleRow?.user?.email}
              <a
                onClick={() =>
                  setVisibleEdit({
                    value: true,
                    data: {
                      label: "email",
                      type: 1,
                    },
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                Edit
              </a>
            </span>
          }
        />
        <ViewCards
          label="Phone Number(US)"
          value={
            <span>
              {singleRow?.contact_no}
              <a
                onClick={() =>
                  setVisibleEdit({
                    value: true,
                    data: {
                      label: "contact_no",

                      type: 2,
                    },
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                Edit
              </a>
            </span>
          }
        />
        <ViewCards
          label="Phone Number(Local)"
          value={
            <span>
              {singleRow?.local_contact_no}
              <a
                onClick={() =>
                  setVisibleEdit({
                    value: true,
                    data: {
                      label: "local_contact_no",

                      type: 2,
                    },
                  })
                }
                style={{ marginLeft: "10px" }}
              >
                Edit
              </a>
            </span>
          }
        />

       
        <EditUser />
        </Cards>
      </div>
  
     
    </ModalContent>
  );
};

export default ViewService;
