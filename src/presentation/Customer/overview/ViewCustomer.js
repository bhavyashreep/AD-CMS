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
import {
  DeleteFilled,
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
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

const ViewCustomer = (props) => {
  const [
    { viewVisible, singleRow },
    { addImages, setVisibleEdit, customerDetails, onImgDelete, onPropertyEdit },
  ] = useUserStore();

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
                      {item?.house_name}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "house_name",
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
               { item?.street&&<ViewCards
                  label=" "
                  value={
                    <span>
                      {item?.street}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "street",
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
                />}
                {item?.post_office&&<ViewCards
                  label=" "
                  value={
                    <span>
                      {item?.post_office}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "post_office",
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
                />}
              {item?.district&&  <ViewCards
                  label=" "
                  value={
                    <span>
                      {item?.district}
                      <a
                        onClick={() =>
                          setVisibleEdit({
                            value: true,
                            data: {
                              label: "district",
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
                />}
               {item?.state&& <ViewCards
                label=" "
                value={
                  <span>
                    {item?.state}
                    <a
                      onClick={() =>
                        setVisibleEdit({
                          value: true,
                          data: {
                            label: "state",
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
              />}
                <div>
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
                  {/* <button
                  onClick={() => {
                    printDocument();
                  }}
                  id="submit"
                >
                  Export to PDF
                </button> */}
                  <ViewCards
                    label="Authorization Letter"
                    value={
                      <Link
                        to={{
                          pathname: `/authLetter/${props.match.params.id}/${index}`,
                        }}
                        target="_blank"
                      >
                        <Button style={{
                        background:"#4148FF",
                        color:"white"

                      }} >View Pdf</Button>
                      </Link>
                      // <Button  type="primary" icon={<DownloadOutlined />}>
                      //   Download
                      // </Button>
                    }
                  />
                {item?.property_rented &&   <ViewCards
                    label="Consent Letter"
                    value={
                      <Link
                      
                        to={{
                          pathname: `/consentLetter/${props.match.params.id}/${index}`,
                        }}
                        target="_blank"
                      >
                        <Button style={{
                        background:"#4148FF",
                        color:"white"

                      }}>View Pdf</Button>
                      </Link>
                      // <Button  type="primary" icon={<DownloadOutlined />}>
                      //   Download
                      // </Button>
                    }
                  />}
                  <ViewCards label="Images" value="" />
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                          style={{
                            borderRadius: 0,
                            width: "150px",
                            height: "150px",
                          }}
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
                </div>
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
