import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useRegionStore } from "../store";
import { Col, Row } from "antd";

const EditPincode = () => {
  const [form] = Form.useForm();
  const [{ viewVisibleEdit, singleRow }, { onEdit, onfinish, setVisibleEdit }] =
  useRegionStore();
  const { Option } = Select;
  useEffect(() => {
    form.setFieldsValue(singleRow);
    console.log("services", singleRow);
  }, [singleRow]);

  return (
    <Modal
      type="primary"
      title="Edit User"
      visible={viewVisibleEdit}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            form="editRegion"
            size="default"
            htmlType="submit"
            type="primary"
            key="submit"
          >
            Confirm
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisibleEdit(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisibleEdit(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="editRegion"
            name="editRegion"
            onFinish={(values) => onEdit(values,singleRow?.id)}
          >
        
          
              <Form.Item name="name">
                <Input placeholder="Region Name" />
              </Form.Item>
          
            
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditPincode;
