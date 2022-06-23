import React, { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useUserStore } from "../store";
import { Col, Row } from "antd";

const EditCategory = () => {
  const [form] = Form.useForm();
  const [
    { viewVisibleEdit, singleRow, editDetails },
    { onEdit, onPropertyEdit, setVisibleEdit },
  ] = useUserStore();
  console.log("single row", singleRow, editDetails);

  useEffect(() => {
    console.log("single rowww", editDetails);
    if (editDetails?.type === 1) {
      form.setFieldsValue(singleRow?.user);
    } else if (editDetails?.type === 3) {
      form.setFieldsValue(singleRow?.properties[editDetails?.index]);
    } else {
      form.setFieldsValue(singleRow);
    }
  }, [singleRow, editDetails]);

  return (
    <Modal
      type="primary"
      title="Edit User"
      visible={viewVisibleEdit}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            form="editProject"
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
            id="editProject"
            name="editProject"
            onFinish={(values) => {
              editDetails?.type === 3
                ? onPropertyEdit(
                    values,
                    singleRow?.properties[editDetails?.index].id
                  )
                : onEdit(values, singleRow?.id);
            }}
          >
            <Form.Item name={editDetails?.label}>
              <Input placeholder={editDetails?.label} />
            </Form.Item>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
};

export default EditCategory;
