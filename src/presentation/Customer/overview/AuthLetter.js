import React, { useState, useRef, useEffect } from "react";
import Logo from "../../common/Assets/Images/Logo.svg";
// import Done from "../../common/Assets/Images/tick.svg";

import ReactToPrint from "react-to-print";
import { AuthLetterr } from "../style";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useUserStore } from "../store";

export default function AuthLetter(props) {
  const [isVisible, setisVisible] = useState(true);
  const componentRef = useRef();
  let location = useLocation();
  const [{ singleRow }, { customerDetails }] = useUserStore();
  const [property, setProperty] = useState({});

  useEffect(() => {
    customerDetails(props.match.params.id);
  }, [customerDetails]);

  useEffect(() => {
    if (singleRow.properties !== undefined) {
      console.log(singleRow?.properties[props.match.params.index], "oioi");
      setProperty(singleRow?.properties[props.match.params.index]);
    }
  }, [singleRow]);

  return (
    <div>
      {/* {props.match.params.index} */}
      <ReactToPrint
        trigger={() => (
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "24px",
            }}
          >
            {" "}
            <Button type="primary" icon={<DownloadOutlined />}>
              Download
            </Button>
          </div>
        )}
        content={() => componentRef.current}
      />
      <ComponentToPrint
        property={property}
        // index={props.match.params.index}
        // id={props.match.params.id}
        ref={componentRef}
      />
    </div>
  );
}

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [{ singleRow }, { customerDetails }] = useUserStore();

  // useEffect(() => {
  //   console.log("calling apii");

  //   customerDetails(props.id);
  //   // setProperty(singleRow?.properties[props?.index])
  // }, [customerDetails]);
  // // console.log("single row", singleRow);
  // console.log("single row prop", props?.property[0]);

  return (
    // <AuthLetterr>

    <div
      style={{
        padding: "90px",
        fontFamily: "Poppins",
        letterSpacing: "0.7px",
      }}
      id="authLetter"
      ref={ref}
    >
      {" "}
      <img src={Logo} />
      <br /> <br /> <br /> <br />
      <div style={{ marginLeft: "24px" }}>
        <p>
          Authorization Letter:
          <span style={{ marginLeft: "14px", fontWeight: "bold" }}>
            {props.property?.authorization_id}
          </span>
        </p>
        <p>
          Date:
          <span style={{ fontWeight: "bold", marginLeft: "14px" }}>20/06/2022</span>
        </p>
        <p>
          Name:
          <span style={{ fontWeight: "bold", marginLeft: "14px" }}>
            {singleRow?.user?.first_name + " " + singleRow?.user?.last_name}
          </span>
        </p>
        <br />
        <p>
          Address:
          <span style={{ fontWeight: "bold", marginLeft: "14px" }}>
            {props.property?.address_line1}
            <br />
            {props.property?.address_line2}
            <br />

            {props.property?.address_line3}
          </span>
        </p>
        <h3
          style={{
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "bold",
            marginTop: "34px",
            marginBottom: "44px",
          }}
        >
          TO WHOMSOEVER IT MAY CONCERN
        </h3>
        <div className="auth-content">
          <p style={{ marginBottom: "24px" }}>
            I,{" "}
            <span style={{ fontWeight: "bold", marginLeft: "14px" }}>
              {singleRow?.user?.first_name + " " + singleRow?.user?.last_name}
              {/* {data?.first_name + " "+data?.last_name} */}
            </span>{" "}
            hereby authorise representative of Home 247 to
            <br />
          </p>
          <p>
            {" "}
            a) Access my property located at <span style={{ fontWeight: "bold"}}>{props.property?.address_line1},
         &nbsp;{props.property?.address_line2},&nbsp;{props.property?.address_line3}</span> for
            taking pictures/ videos of the property
          </p>
          <p>
            b) Follow up with my tenant,name :
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {props.property?.tenant_details?.name}
            </span>{" "}
            on my rental dues
          </p>
          <p>c) Represent me in the property related meetings</p>
          <p>d) Inspect the property for any maintenance needs</p>
          <p>
            e) any other services related to upkeep and maintenace of my
            property
          </p>
          <p style={{ marginTop: "34px" }}>
            This authorisation is valid for a period of one year from the date
            mentioned on this letter.
          </p>
          <br />
          Sincerely,
          <br />
          <br />
          <span style={{fontWeight: "bold" }}>{singleRow?.user?.first_name + " " + singleRow?.user?.last_name} </span>
          
          <div style={{ marginTop: "24px" }} className="signature">
            <p>
              This is digitally signed document
              <br />
              <span style={{ fontWeight: "bold" }}>
                {props.property?.authorization_id}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "1px",
          background: "grey",
          marginTop: "60px",
          marginBottom: "14px",
        }}
        className="divider"
      ></div>
      <div
        style={{
          color: "grey",
          marginLeft: "24px",
          backgroundImage: `url("../../common/Assets/Images/tick.png")`,
        }}
        className="footer"
      >
        Privy Property Management Private Limited,
        <br />
        7TH FLOOR,TEMPLE TOWER,NO.672,ANNA SALAI,NANDANAM,CHENNAI-600035
        <br />
        <small style={{ color: "black" }}>reachus@home247.in</small>
      </div>
    </div>

    // </AuthLetterr>
  );
});
