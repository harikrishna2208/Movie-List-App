/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Radio, Spin } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import axios from 'axios';
// import Img from '../../images/Login.gif';

const initialState = {
  booleanStateValues: {
    isLoading: false,
    showStatusModal: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
  },
};

const { Header, Content } = Layout;

const SignUp = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const successIcon = <CheckCircleFilled className="success-icon" />;
  const failureIcon = <CloseCircleFilled className="failure-icon" />;
  const userNameRegex = '^(?![0-9]*$)[a-zA-Z0-9\\-\\s]+.{1,}$';
  const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  const empEmailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$';

  const onFinish = (values) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = values;
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/register`, body)
      .then((res) => {
        if (res.status === 201) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Sign-Up',
              modalsIcon: successIcon,
              modalsMessage: 'Signup completed successfully. Please proceed to Login.',
            },
          }));
          history('./login');
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Sign-Up',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Error',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Sign-Up',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Down',
            },
          }));
        } else if (err.response.status === 409) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Sign-Up',
              modalsIcon: failureIcon,
              modalsMessage: 'Your account is already created. Please do Login.',
            },
          }));
          setTimeout(() => {
            history('./login');
          }, 5000);
        } else if (err.response.status === 500) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Sign-Up',
              modalsIcon: failureIcon,
              modalsMessage: 'Internal Server Error',
            },
          }));
        }
      });
  };

  const onFinishFailed = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showStatusModal: true,
      },
      textStateValues: {
        ...state.textStateValues,
        modalsTitle: 'Sign-Up',
        modalsIcon: failureIcon,
        modalsMessage: 'Please fill all the fields.',
      },
    }));
  };

  const handleLoginClick = () => {
    history('./login');
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage.length === 55) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history('./');
    } else {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
    }
  };

  const statusModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      visible={state.booleanStateValues.showStatusModal}
      centered
      closable={false}
      onOk={handleStatusModalOk}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

  return (
    <div>
      {state.booleanStateValues.isLoading ? (
        <div className="pagecenter">
          <Spin size="large" style={{ marginTop: '50vh' }} />
        </div>
      ) : (
        <div style={{ height: '100vh' }}>
          <Row>
            {/* <Col xs={0} sm={0} md={16} lg={16} xl={17}>
                <img
                  src={Img}
                  alt="#"
                  style={{
                    height: '100vh',
                    width: '100%',
                  }}
                />
              </Col> */}
            <Col xs={24} sm={24} md={8} lg={8} xl={7}>
              <Layout
                style={{
                  height: '100vh',
                  backgroundColor: 'wheat',
                  alignItems: 'center',
                }}
              >
                <Header style={{ backgroundColor: 'wheat' }}>
                  <Radio.Group defaultValue="b" buttonStyle="solid" size="large">
                    <Radio.Button value="a" onChange={handleLoginClick}>
                      Log-In
                    </Radio.Button>
                    <Radio.Button value="b">Sign-Up</Radio.Button>
                  </Radio.Group>
                </Header>
                <Content>
                  <PageHeader className="signin-login-header">Sign Up to Movies App</PageHeader>
                  <Form
                    form={form}
                    name="SignUp"
                    layout="vertical"
                    requiredMark={false}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="name"
                      label="User Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter User Name',
                        },
                        {
                          pattern: RegExp(userNameRegex),
                          message: 'User Name should be Alphabetic or Alphanumeric with length 2',
                        },
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input type="text" placeholder="User Name" autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email ID"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter User Email ID',
                        },
                        {
                          pattern: RegExp(empEmailRegex),
                          message: 'Please enter valid Email ID',
                        },
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input type="text" placeholder="Email ID" autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="Password"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Password',
                        },
                        {
                          pattern: RegExp(passwordRegex),
                          message:
                            'Password should contain 1 Uppercase, 1 Lowercase, 1 Special character with length 8',
                        },
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your Password',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Password and Confirm Password must match'),
                            );
                          },
                        }),
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input.Password
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          fontWeight: 'bold',
                          height: 'auto',
                          padding: '6px 15px',
                          width: '300px',
                          marginTop: '20px',
                        }}
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Form>
                </Content>
              </Layout>
            </Col>
          </Row>
          {statusModal}
        </div>
      )}
    </div>
  );
};

export default SignUp;
