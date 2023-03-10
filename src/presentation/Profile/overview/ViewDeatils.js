import React, { useState, useEffect } from "react";
import { Form, Input, Select, Image, Popconfirm, Upload, message } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { ModalContent } from "../style";
import moment from "moment";
import { useUserStore } from "../store";
import { logError } from "../../common/Utils";
import ViewCards from "../../common/ViewCards";
import { Collapse } from "antd";
import EditUser from "./EditUser";
import FeatherIcon from "feather-icons-react";
import { DeleteFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";

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

const ViewCustomer = (props) => {
  const [
    { viewVisible, singleRow },
    { addImage, setVisibleEdit, customerDetails, onImgDelete, setVisible },
  ] = useUserStore();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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

 
  console.log(singleRow, "single course");
  return (
    <ModalContent>
      <div style={{ padding: "40px", minHeight: "90vh" }}>
        
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
        <Collapse onChange={onChange}>
          {singleRow?.properties?.map((item, index) => (
            <Panel header={"Property" + " " + parseInt(index + 1)} key="1">
              <div>
                <ViewCards
                  label="Property Name : "
                  value={"Property" + " " + parseInt(index + 1)}
                />
                <ViewCards
                  label="Address : "
                  value={
                    <span>
                      {item?.address_line1}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "address_line1",
                              index: index,
                              type: 3,
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
                  label=" "
                  value={
                    <span>
                      {item?.address_line2}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "address_line2",
                              index: index,
                              type: 3,
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
                  label="Property Type"
                  value={
                    <span>
                      {item?.property_type}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "property_type",
                              index: index,
                              type: 3,
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
                  label="Authorization Letter"
                  value={
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      size={size}
                    >
                      Download
                    </Button>
                  }
                />
                <ViewCards label="Images" value="" />
                {item?.images?.map((img) => (
                  <span
                    className="propContainer"
                    style={{ display: "inline-block" }}
                  >
                    <Popconfirm
                      title="Are you sure to delete this user?"
                      onConfirm={() =>
                        onImgDelete(item?.id, img?.id, singleRow?.id)
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteFilled className="deleteIcon" size={16} />
                    </Popconfirm>
                    <Image
                      className="propImage"
                      style={{ borderRadius: 0, width: "200px" }}
                      src={img?.image}
                    />
                  </span>
                ))}
                <span className="addImage">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={(info) => handleChange(info, item?.id)}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </span>
              </div>
            </Panel>
          ))}
        </Collapse>
        <EditUser />
      </div>
    </ModalContent>
  );
};

export default ViewCustomer;
