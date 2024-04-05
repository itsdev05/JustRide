// import React from "react";
// import { Row, Col, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { userRegister } from "../redux/actions/userActions";
// import { message } from "antd";

// function Register() {
//   const dispatch = useDispatch();

//   function onFinish(values) {
//     if (
//       values.password.length >= 8 &&
//       values.password.length < 23 &&
//       values.phone.length >= 11 &&
//       values.phone.length < 13
//     ) {
//       dispatch(userRegister(values));
//       console.log(values);
//     } else if (values.password.length > 24) {
//       message.error("Password is very lengthy to remember");
//     } else if (values.password.length < 8) {
//       message.error("Password is weak");
//     } else if (values.phone.length > 13 || values.phone.length < 11) {
//       message.error("Invalid Phone Number");
//     }
//     localStorage.setItem('registeredUser', JSON.stringify({
//       username: values.username,
//       email: values.email
//     }));

//   }
//   return (
//     <div className="login">
//       <Row gutter={8}>
//         <Col lg={8} className="text-left p-5">
//           <Form
//             layout="vertical"
//             className="login-form p-5"
//             onFinish={onFinish}
//           >
//             <h1 className="login-heading">Register</h1>
//             <hr />
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true }]}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter your username..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <Form.Item
//               name="firstname"
//               label="First Name"
//               rules={[{ required: true }]}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter your first name..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <Form.Item
//               name="lastname"
//               label="Last Name"
//               rules={[{ required: true }]}
//             >
//               <input
//                 type="text"
//                 placeholder="Enter your last name..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[{ required: true }]}
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email address..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true }]}
//             >
//               <input
//                 type="password"
//                 placeholder="Enter your password..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
//               <input
//                 type="tel"
//                 placeholder="Enter your phone number..."
//                 className="p-2"
//               />
//             </Form.Item>
//             <button className="btn2 mt-2 mb-3">Register</button>
//             <br />
//             <Link to="/Login">Click here to Login</Link>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { Row, Col, Form, Input, Upload, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { message } from "antd";
import { UploadOutlined } from '@ant-design/icons';


function Register() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  async function onFinish(values) {
    if (file) {
      const reader = await new FileReader();
      await reader.readAsBinaryString(file);

      await new Promise((resolve) => {
        reader.onload = async () => {
          const imageData = await reader.result;
          values.image = imageData;
          resolve();
        };
      });
    }
    if (
      values.password.length >= 8 &&
      values.password.length < 23 &&
      values.phone.length >= 11 &&
      values.phone.length < 13
    ) {
      console.log(values);
      dispatch(userRegister(values));
    } else if (values.password.length > 24) {
      message.error("Password is very lengthy to remember");
    } else if (values.password.length < 8) {
      message.error("Password is weak");
    } else if (values.phone.length > 13 || values.phone.length < 11) {
      message.error("Invalid Phone Number");
    }
    localStorage.setItem('user', JSON.stringify({
      username: values.username,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,

    }));
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      setFile(file)
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="login">
      <Row gutter={8}>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1 className="login-heading">Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your username..." />
            </Form.Item>
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your first name..." />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your last name..." />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your email address..." />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Enter your password..." />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your phone number..." />
            </Form.Item>
            <Form.Item
              name="image"
              label="Profile Image"
              rules={[{ required: true }]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                customRequest={dummyRequest}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="address"
              label="Full Address"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter your full address..." />
            </Form.Item>
            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your pincode..." />
            </Form.Item>
            <Form.Item
              name="license"
              label="License Number"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter your license number..." />
            </Form.Item>
            <button className="btn2 mt-2 mb-3">Register</button>
            <br />
            <Link to="/Login">Click here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
