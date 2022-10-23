/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition, arrow-body-style */
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Modal, Layout, PageHeader, Radio, Spin } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
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
    errorMessage: '',
  },
};

const { Header, Content } = Layout;

const Login = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [state, setState] = useState(initialState);
  const failureIcon = <CloseCircleFilled className="failure-icon" />;

  const onFinish = (values) => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        isLoading: true,
      },
    }));
    const body = { email: values.email.trim(), password: values.password };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, body, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
          }));
          localStorage.setItem('userEmail', res.data.data.userEmail);
          localStorage.setItem('accessToken', res.data.data.accessToken);
          history('/main-page');
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
              modalsTitle: 'Log-In',
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
              modalsTitle: 'Log-In',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Down',
            },
          }));
        } else if (err.response.status === 403) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
            },
            textStateValues: {
              ...state.textStateValues,
              errorMessage: 'Incorrect Email ID/Password!! Retry..',
            },
          }));
        } else if (err.response.status === 404) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoading: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Log-In',
              modalsIcon: failureIcon,
              modalsMessage: 'Sorry, you are not registered user. Please do Signup and Login.',
            },
          }));
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
              modalsTitle: 'Log-In',
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
        modalsTitle: 'Log-In',
        modalsIcon: failureIcon,
        modalsMessage: 'Please enter Email ID and Password.',
      },
    }));
  };

  const handleSignupClick = () => {
    history('/register');
  };

  const handleStatusModalOk = () => {
    if (state.textStateValues.modalsMessage.length === 63) {
      setState((prevState) => ({
        ...prevState,
        booleanStateValues: {
          ...state.booleanStateValues,
          showStatusModal: false,
        },
      }));
      history('/register');
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
            <Col xs={24} sm={24} md={8} lg={8} xl={7}>
              <Layout
                style={{ height: '100vh', backgroundColor: 'wheat', alignItems: 'center' }}
              >
                <Header style={{ backgroundColor: 'wheat' }}>
                  <Radio.Group defaultValue="a" buttonStyle="solid" size="large">
                    <Radio.Button value="a">Log-In</Radio.Button>
                    <Radio.Button value="b" onChange={handleSignupClick}>
                      Sign-Up
                    </Radio.Button>
                  </Radio.Group>
                </Header>
                <Content>
                  <PageHeader className="signin-login-header">Log In to Movies App</PageHeader>
                  <div style={{ color: 'red', textAlign: 'center' }}>
                    {state.textStateValues.errorMessage.length !== 0
                      ? state.textStateValues.errorMessage
                      : null}
                  </div>
                  <Form
                    form={form}
                    name="Login"
                    layout="vertical"
                    requiredMark={false}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="email"
                      label="Email ID"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Email ID',
                        },
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input type="text" placeholder="Email ID" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Password',
                        },
                      ]}
                      style={{
                        width: '300px',
                      }}
                    >
                      <Input.Password placeholder="Password" />
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
                          marginTop: '10px',
                        }}
                      >
                        Log In
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

export default Login;
