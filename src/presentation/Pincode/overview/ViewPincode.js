import React, { useState, useEffect } from "react";
import { Form, Image, Input, Select} from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { ModalContent } from "../style";
import moment from "moment";
import { usePincodeStore } from "../store";
import { logError } from "../../common/Utils";
// import { onEdit } from "../../../infrastructure/faculty";
import ViewCards from "../../common/ViewCards";
import { Collapse } from "antd";

const { Option } = Select;

const EditCategory = () => {
  const [form] = Form.useForm();
  const { Panel } = Collapse;

  const onChange = (key) => {
    console.log(key);
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const [{ viewVisible, singleRow }, { onEdit, setVisible }] = usePincodeStore();
  console.log(singleRow, "single course");
  return (
    <Modal
      type="primary"
      title="View User"
      visible={viewVisible}
      footer={[
        <div key="1" className="project-modal-footer-delete">
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
          {/* <Button
            form="editProject"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
            danger
          >
            Delete
          </Button> */}
        </div>,
      ]}
      onCancel={() => setVisible(false)}
    >
      <ModalContent>
        <div className="project-modal display">
          {
            singleRow?.photo&& <ViewCards
            label=""
            value={<img className="avatar" src={process.env.REACT_APP_BASE_API+singleRow?.photo} />}
          />
          }
         
          <ViewCards label="Name" value={singleRow?.user?.first_name} />
          <ViewCards label="Email" value={singleRow?.user?.email} />
          <ViewCards label="Phone Number(US)" value={singleRow?.contact_no} />
          <ViewCards
            label="Phone Number(Local)"
            value={singleRow?.local_contact_no}
          />

          <Collapse defaultActiveKey={["1"]} onChange={onChange}>
            {singleRow?.properties?.map((item, index) => (
              <Panel header={"Property"+" "+parseInt(index + 1)} key="1">
                <div>
                  <ViewCards
                    label="Property Name : "
                    value={"Property" + " " + parseInt(index + 1)}
                  />

                  <ViewCards label="Address : " value={item?.address_line1} />
                  <ViewCards label=" " value={item?.address_line2} />
                  <ViewCards label="Property Type" value={item?.address_line2} />
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EditCategory;
