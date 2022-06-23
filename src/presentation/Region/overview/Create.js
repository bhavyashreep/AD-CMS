import React, { useState } from "react";
import { Form, Input, Radio } from "antd";
import { Col, Row, Select } from "antd";
import propTypes from "prop-types";
import { Button } from "../../common/UI/buttons/buttons";
import { Modal } from "../../common/UI/modals/antd-modals";
import { BasicFormWrapper } from "../../common/Style/styled";
import { useRegionStore } from "../store";

function Create() {
  const [form] = Form.useForm();
  const [{ VisibleCreate,regionList }, { onfinish, setVisibleCreate }] = useRegionStore();
  const { Option } = Select;

  const [type, setType] = useState(1);
  const [value, setValue] = useState(1);

  return (
    <Modal
      type={"primary"}
      title="Add New User"
      visible={VisibleCreate}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button
            size="default"
            type="primary"
            key="submit"
            htmlType="submit"
            form="create"
          >
            Create
          </Button>
          <Button
            size="default"
            type="white"
            key="back"
            outlined
            onClick={() => setVisibleCreate(false)}
          >
            Cancel
          </Button>
        </div>,
      ]}
      onCancel={() => setVisibleCreate(false)}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form
            form={form}
            id="create"
            name="create"
            onFinish={(values) => onfinish(values,type)}
          >
            <Form.Item name="type">
              <Radio.Group
                onChange={(e) =>
                  setType(e.target.value) || console.log("value", value)
                }
                value={value}
                defaultValue={1}
              >
                <Radio value={1}>Region</Radio>
                <Radio value={2}>Pincode</Radio>
              </Radio.Group>
            </Form.Item>
            {type === 1 ? (
              <Form.Item name="name">
                <Input placeholder="Region Name" />
              </Form.Item>
            ) : (
              <>
                {" "}
                <Row gutter={15}>
                  <Col md={12}>
                    <Form.Item style={{ width: "100%" }} name="region" initialValue={1}>
                      <Select style={{ width: "100%" }}>
                        {regionList?.map((item)=> <Option value={item?.id}>{item?.name}</Option>)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item name="pincode">
                      <Input placeholder="Pincode" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
  );
}
Create.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default Create;
