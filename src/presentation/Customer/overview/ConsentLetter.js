import React, { useState, useRef, useEffect } from "react";
import Logo from "../../common/Assets/Images/Logo.svg";
// import Done from "../../common/Assets/Images/tick.svg";
import Image from "../../common/Assets/Images/tick.png";


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
          Consent Letter:
          <span style={{ marginLeft: "14px", fontWeight: "bold" }}>
            {props.property?.tenant_details?.consent_id}
          </span>
        </p>
        <p>
          Date:
          <span style={{ fontWeight: "bold", marginLeft: "14px" }}>{props.property?.authorized_date}</span>
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
          {props.property?.house_name}
            <br />
            {props.property?.street}
            <br />

            {props.property?.post_office}
            <br/>
            {props.property?.district},
            {props.property?.state}
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
        Dear 
        <span  style={{ fontWeight: "bold" }}> {props.property?.tenant_details?.name}</span>,
        <br />
        <br />
        <div className="auth-content">
        <p>
            This is to inform you that I have appointed Home 247 to manage my
            property. The team from Home 247 may contact you for any support in
            regards to managing the property , any maintenance needs and
            following up on the rent. Kindly provide the necessary support.
          </p>
          <br />
          Sincerely,
          <br />
          <br />
          <span style={{fontWeight: "bold" }}>{singleRow?.user?.first_name + " " + singleRow?.user?.last_name} </span>
          
          <div  style={{
              marginTop: "24px",
              backgroundImage: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${Image})`,
              backgroundPosition: "left center",
              backgroundRepeat:"no-repeat",
              backgroundSize:"contain",
              // opacity:"0.6"
            }}  className="signature">
            <p>
              This is digitally signed document
              <br />
              <span style={{ fontWeight: "bold" }}>
                {props.property?.tenant_details?.consent_id}
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
        Privy Property Management Services Private Limited,
        <br />
        TEMPLE TOWERS,7TH FLOOR, 672/476, ANNA SALAI, NANDANAM, CHENNAI, TAMIL NADU-600035 INDIA
        <br />
        <small style={{ color: "black" }}>reachus@home247.in</small>
      </div>
    </div>

    // </AuthLetterr>
  );
});
