/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import './MovieListPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  Modal,
  Layout,
  Space,
  Tooltip,
  Input,
  Button,
  Table,
  Typography,
  InputNumber,
} from 'antd';
import DatePicker from '../Date/DatePicker';
import {
  PlusOutlined,
  DeleteOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
  AppstoreTwoTone,
  CheckCircleFilled,
  CloseCircleFilled,
  SaveFilled,
} from '@ant-design/icons';
import { nanoId4Digit } from '../../services/randomIdGenerator';
import dayjs from 'dayjs';

const successIcon = <CheckCircleFilled twoToneColor="#52c41a" className="success-icon" />;
const failureIcon = <CloseCircleFilled twoToneColor="#eb2f96" className="failure-icon" />;

const { Header } = Layout;
const lightRed = '#fc8f83';

const initialState = {
  booleanStateValues: {
    saveIndication: false,
    showStatusModal: false,
    focus: false,
    editable: false,
  },
  textStateValues: {
    modalsTitle: '',
    modalsIcon: '',
    modalsMessage: '',
    selectedMovie: '',
    radioValue: '',
    searchValue: '',
  },
  keyCount: 2,
  newMovies: [],
  selectedRowKeys: [],
  allMovieDetail: [],
  movieNameList: [],
  totalSelectedValue: [],
  selectedValue: [],
  filterTable: [],
  joiTableValidation: [],
  moviesData: [],
};

const MovieListPage = () => {
  const history = useNavigate();
  const [state, setState] = useState(initialState);

  const handleMovieNameChange = (e, index) => {
    setState((prevState) => ({
      ...prevState,
      moviesData: prevState.moviesData.map((item) => {
        return item.id === index ? { ...item, movie_name: e.target.value } : item;
      }),
    }));
  };

  const handleInputChange = (e, index) => {
    if (isNaN(e)) {
      console.log(`Input is not a Number`);
    } else {
      if (state.booleanStateValues.saveIndication) {
        setState((prevState) => ({
          ...prevState,
          moviesData: prevState.moviesData.map((item) => {
            return index === item.id ? { ...item, rating: e } : item;
          }),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          moviesData: prevState.moviesData.map((item) => {
            return index === item.id ? { ...item, rating: e } : item;
          }),
          booleanStateValues: {
            ...state.booleanStateValues,
            saveIndication: true,
          },
        }));
      }
    }
  };

  const handleStatusModalOk = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showStatusModal: false,
      },
    }));
  };

  const handleGenreChange = (input, recordId) => {
    if (input !== null || input !== undefined) {
      const { name, target } = input;
      setState((previousState) => ({
        ...previousState,
        moviesData: previousState.moviesData.map((movie) =>
          movie.id === recordId ? { ...movie, genre: target.value } : movie,
        ),
      }));
    }
  };

  const handleMoviesDeSelectOrClear = (value) => {
    setState((previous) => ({ ...previous, totalSelectedValue: [] }));
  };

  const handleMovieSelect = (value) => {
    if (value.length === 0) {
      setState((prevState) => ({
        ...prevState,
        moviesData: initialState.moviesData,
        selectedValue: [],
        keyCount: 2,
        textStateValues: {
          ...state.textStateValues,
        },
        joiTableValidation: [],
      }));
    } else if (value.length > 0) {
      setState((prevState) => ({
        ...prevState,
        moviesData: state.allMovieDetail.filter((movie) => value.includes(movie.movie_name)),
        selectedValue: value,
        totalSelectedValue: [...new Set(prevState.totalSelectedValue)],
        booleanStateValues: {
          ...state.booleanStateValues,
        },
        joiTableValidation: [],
      }));
    }
  };

  const handleDateChange = (_, dateString, index) => {
    if (state.booleanStateValues.saveIndication) {
      setState((prevState) => ({
        ...prevState,
        moviesData: prevState.moviesData.map((item) => {
          return index === item.id ? { ...item, release_date: dateString } : item;
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        moviesData: prevState.moviesData.map((item) => {
          return index === item.id ? { ...item, release_date: dateString } : item;
        }),
        booleanStateValues: {
          ...state.booleanStateValues,
          saveIndication: true,
        },
      }));
    }
  };

  const handleCastChange = (value, option, selectedId) => {
    setState((previous) => ({
      ...previous,
      moviesData: previous.moviesData.map((movie) => {
        return movie.id === selectedId
          ? { ...movie, cast: [...new Set([...movie.cast, ...value])] }
          : movie;
      }),
    }));
  };

  const handleBackspaceDisable = (e) => {
    if (e.keyCode === 8) {
      e.stopPropagation();
    }
  };

  const handleActionModalCancel = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: false,
      },
      moviesData: initialState.moviesData,
    }));
  };

  const handleActionModalOk = () => {
    setState((prevState) => ({
      ...prevState,
      booleanStateValues: {
        ...state.booleanStateValues,
        showActionModal: false,
      },
    }));
  };
  const actionModal = (
    <Modal
      title={state.textStateValues.modalsTitle}
      maskClosable={false}
      keyboard={false}
      centered
      closable={false}
      visible={state.booleanStateValues.showActionModal}
      onOk={handleActionModalCancel}
      onCancel={handleActionModalOk}
      okText="No"
      cancelText="Yes"
    >
      <div className="action-modal">
        {state.textStateValues.modalsIcon}
        <div>{state.textStateValues.modalsMessage}</div>
      </div>
    </Modal>
  );

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
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/movies/AllMoviesDetails`).then((response) => {
      setState((previous) => ({
        ...previous,
        moviesData: response.data.data,
        movieNameList: response.data.data.map(({ id, movie_name }) => ({ id, movie_name })),
        allMovieDetail: response.data.data,
      }));
    });
  }, []);

  const updateMoviesDetails = () => {
    const body = state.moviesData;
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/movies/updateMoviesDetails`, body, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            moviesData: res.data.data,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Movie Details',
              modalsIcon: successIcon,
              modalsMessage: 'Saved Successfully',
            },
            joiTableValidation: [],
          }));
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Update Movies Details',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Error',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Update Movies Details',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Down',
            },
          }));
        } else if (err.response.status === 500) {
          if (err.response.data.message === 'Data not saved') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Movies Details',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal Server Error',
              },
              joiTableValidation: [],
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Update Movies Details',
                modalsIcon: failureIcon,
                modalsMessage: 'Session Expired, Please Login again',
              },
            }));
          }
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Update Movies Details',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory Fields are missing/wrong',
            },
            joiTableValidation: err.response.data.data.errorDetails,
          }));
        }
      });
  };

  const saveNewMoviesDetails = () => {
    const body = state.moviesData.map(({ id, ...rest }) => ({ ...rest }));
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/movies/saveNewMoviesDetails`, body, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          setState((prevState) => ({
            ...prevState,
            moviesData: initialState.moviesData,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Movie Details',
              modalsIcon: successIcon,
              modalsMessage: 'Saved Successfully',
            },
            joiTableValidation: [],
          }));
        }
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Movie Details',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Error',
            },
          }));
        } else if (err.response === undefined) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Movies Details',
              modalsIcon: failureIcon,
              modalsMessage: 'Server Down',
            },
          }));
        } else if (err.response.status === 500) {
          if (err.response.data.message === 'Data not saved') {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showActionModal: false,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Movies Details',
                modalsIcon: failureIcon,
                modalsMessage: 'Internal Server Error',
              },
              joiTableValidation: [],
            }));
          } else if (!err.response.data.data.tokenPresent || !err.response.data.data.tokenVerify) {
            setState((prevState) => ({
              ...prevState,
              booleanStateValues: {
                ...state.booleanStateValues,
                showStatusModal: true,
              },
              textStateValues: {
                ...state.textStateValues,
                modalsTitle: 'Save Movies Details',
                modalsIcon: failureIcon,
                modalsMessage: 'Session Expired, Please Login again',
              },
            }));
          }
        } else if (err.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              isLoadingResource: false,
              showStatusModal: true,
            },

            textStateValues: {
              ...state.textStateValues,
              modalsTitle: 'Save Resource Planning',
              modalsIcon: failureIcon,
              modalsMessage: 'Mandatory Fields are missing/wrong',
            },
            joiTableValidation: err.response.data.data.errorDetails,
          }));
        }
      });
  };

  const deleteMoviesInDatabase = () => {
    const data = { id: state.selectedRowKeys };
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/movies/deleteMoviesDetails`, {
        data,
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const newMoviesAfterDelete = state.moviesData.filter(
            (ele) => !state.selectedRowKeys.includes(ele.id),
          );

          setState((previous) => ({
            ...previous,
            moviesData: newMoviesAfterDelete,
            movieNameList: newMoviesAfterDelete.map(({ id, movie_name }) => ({ id, movie_name })),
            allMovieDetail: newMoviesAfterDelete,
            booleanStateValues: {
              showStatusModal: true,
            },
            textStateValues: {
              ...previous.textStateValues,
              modalsMessage: 'Delete Successfully',
              modalsTitle: 'Delete Movie Details',
              modalsIcon: successIcon,
            },
          }));
        }
      })
      .catch((err) => {
        const setErrorSet = ({ modalsTitle, modalsMessage }) => {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: true,
            },
            textStateValues: {
              ...state.textStateValues,
              modalsTitle,
              modalsIcon: failureIcon,
              modalsMessage,
            },
          }));
        };

        if (err.message === 'Network Error') {
          setErrorSet({ modalsTitle: 'Delete Movies Details', modalsMessage: 'Server Error' });
        } else if (err.response === undefined) {
          setErrorSet({ modalsTitle: 'Delete Movies Details', modalsMessage: 'Server Error' });
        } else if (err.response.status === 500) {
          setErrorSet({ modalsTitle: 'Delete Movies Details', modalsMessage: 'Server Error' });
        }
      });
  };

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/logout`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: false,
            },
          }));
          localStorage.clear();
          window.location = '/';
        }
      })
      .catch((err) => {
        const setErrorMessage = (modalsMessage) => {
          setState((prevState) => ({
            ...prevState,
            textStateValues: {
              ...state.textStateValues,
              modalsIcon: failureIcon,
              modalsMessage,
            },
          }));
        };
        if (err.message === 'Network Error') {
          setErrorMessage('Server Down');
        } else if (err.response === undefined) {
          setErrorMessage('Server Down');
        } else if (err.response.status === 500) {
          setErrorMessage('Server Down');
          localStorage.clear();
          window.location = '/';
        } else {
          setState((prevState) => ({
            ...prevState,
            booleanStateValues: {
              ...state.booleanStateValues,
              showStatusModal: false,
            },
          }));
        }
      });
  };
  const tableColumns = [
    {
      title: 'Movie Name',
      dataIndex: 'movie_name',
      key: 'id', //project_code was
      width: 120,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'movie_name',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'movie_name',
        );
        const movieNameElement = (
          <Input
            autoFocus={state.booleanStateValues.focus}
            placeholder="Enter Movie Name"
            name="movie_name"
            value={text || null}
            disabled={state.selectedValue.length !== 0}
            onChange={
              state.booleanStateValues.editable === true
                ? (e) => handleMovieNameChange(e, record.id)
                : undefined
            }
          />
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {movieNameElement}
            </Tooltip>
          );
        }
        return movieNameElement;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.movie_name !== prevRecord.movie_name;
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'id',
      width: 80,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'rating',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'rating',
        );

        const ratingElement = (
          <InputNumber
            min={1}
            max={5}
            placeholder="Enter Rating"
            name="rating"
            value={text || null}
            onChange={(e) => handleInputChange(e, record.id)}
          />
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {ratingElement}
            </Tooltip>
          );
        }
        return ratingElement;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.rating !== prevRecord.rating;
      },
    },
    {
      title: 'Cast',
      dataIndex: 'cast',
      key: 'id',
      width: 240,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'cast',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'cast',
        );

        const placeHolderAddingFunction = () => {
          if (record.cast.length === 0) {
            return `please add cast`;
          } else if (record.cast.length > 1) {
            return record.cast[0].length + record.cast[1].length > 20
              ? `${record.cast[0]} ${record.cast[1] ?? '....'}....`
              : `${record.cast[0]} ${record.cast[1] ?? '....'} ${
                  record.cast[2] ?? '....Select to Add'
                }`;
          }
          return `add New Cast here `;
        };

        const castSelectElement = (
          <Select
            key={record.id}
            mode="tags"
            style={{
              width: '100%',
            }}
            placeholder={placeHolderAddingFunction()}
            onChange={(value, option) =>
              handleCastChange(value, option, record.id, record.cast, text)
            }
            tokenSeparators={[',']}
          >
            {state.moviesData
              .filter((ele) => ele.id === record.id)
              .map((element) => {
                return element.cast.map((cast) => {
                  return (
                    <Select.Option key={nanoId4Digit()} value={cast}>
                      {cast}
                    </Select.Option>
                  );
                });
              })}
          </Select>
        );

        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {castSelectElement}
            </Tooltip>
          );
        }
        return castSelectElement;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.cast !== prevRecord.cast;
      },
    },
    {
      title: 'genre',
      dataIndex: 'genre',
      key: 'id',
      width: 100,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'genre',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'genre',
        );
        const genreElement = (
          <Input
            placeholder="genre"
            name="genre"
            value={text || null}
            onChange={(e) => handleGenreChange(e, record.id)}
          />
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {genreElement}
            </Tooltip>
          );
        }
        return genreElement;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.genre !== prevRecord.genre;
      },
    },
    {
      title: 'Release Date',
      dataIndex: 'release_date',
      key: 'id',
      width: 150,
      onCell: (record, rowIndex) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === rowIndex && ele.field === 'release_date',
        );
        const colorOfBackground = validationError === undefined ? 'transparent' : lightRed;
        return {
          style: { backgroundColor: colorOfBackground },
        };
      },
      render: (text, record, index) => {
        const validationError = state.joiTableValidation.find(
          (ele) => ele.indexValue === index && ele.field === 'release_date',
        );
        const releaseDateElement = (
          <DatePicker
            placeholder="Select Release Date"
            name="release_date"
            value={text ? dayjs(text) : undefined}
            onChange={(date, dateString) => handleDateChange(date, dateString, record.id)}
          />
        );
        if (validationError) {
          return (
            <Tooltip title={validationError.errorMessage} placement="left">
              {releaseDateElement}
            </Tooltip>
          );
        }
        return releaseDateElement;
      },
      shouldCellUpdate: (record, prevRecord) => {
        return record.release_date !== prevRecord.release_date;
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setState((prevState) => ({
        ...prevState,
        selectedRowKeys,
      }));
    },
    getCheckboxProps: () => {
      return {
        disabled: state.selectedValue.length !== 0,
      };
    },
  };
  const handleAddClick = () => {
    const newRow = {
      id: nanoId4Digit(),
      movie_name: '',
      rating: '',
      cast: [],
      genre: '',
      release_date: '',
    };
    if (state.newMovies.length > 0) {
      setState((prevState) => ({
        ...prevState,
        moviesData: [...prevState.moviesData, newRow],
        newMovies: [...prevState.moviesData, newRow],
        keyCount: state.keyCount + 1,
        booleanStateValues: {
          ...state.booleanStateValues,
          editable: true,
          focus: true,
        },
      }));
    } else if (state.newMovies.length === 0) {
      setState((prevState) => ({
        ...prevState,
        moviesData: [newRow],
        newMovies: [newRow],
        keyCount: state.keyCount,
        booleanStateValues: {
          ...state.booleanStateValues,
          editable: true,
          focus: true,
        },
      }));
    }
  };
  const disableAddButton = () => {
    return state.totalSelectedValue.length !== 0;
  };
  const handleDeleteClick = (id) => {
    deleteMoviesInDatabase();
  };

  return (
    <div>
      <div>
        <Header
          className="site-layout-background"
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Space align="baseline">
              <AppstoreTwoTone style={{ fontSize: '30px' }} />
              <Typography style={{ fontSize: '22px' }}>Movies App</Typography>
            </Space>
          </div>
          <div style={{ display: 'flex', marginRight: 30 }}>
            <div style={{ fontSize: 20, marginRight: 10 }}>Logout</div>
            <div style={{ marginTop: 8 }}>
              <Button onClick={handleLogout}>
                <PoweroffOutlined style={{ fontSize: '25px' }} />
              </Button>
            </div>
          </div>
        </Header>
      </div>

      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, marginTop: 40 }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography.Title level={5} style={{ paddingRight: 10 }}>
            Movie list:
          </Typography.Title>
        </div>
        <div style={{ margin: '15px 0px' }}>
          <div className="dropdown-btns-flex">
            <Space>
              <Typography>Movies:</Typography>
              <Select
                style={{ width: '290px' }}
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Select Movie"
                showArrow
                allowClear
                filterOption={(inputValue, option) =>
                  option.children.toString().toLowerCase().includes(inputValue.toLowerCase())
                }
                showSearch
                value={state.selectedValue}
                onDeselect={handleMoviesDeSelectOrClear}
                onClear={handleMoviesDeSelectOrClear}
                onChange={handleMovieSelect}
                onInputKeyDown={handleBackspaceDisable}
              >
                {state.movieNameList.map((movie) => {
                  return (
                    <Select.Option key={movie.id} value={movie.movie_name}>
                      {movie.movie_name}
                    </Select.Option>
                  );
                })}
              </Select>
              <Tooltip placement="bottom" title="Select from dropdown to update existing data">
                <InfoCircleOutlined />
              </Tooltip>
            </Space>
          </div>
        </div>
        <div className="table-border">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space style={{ marginLeft: 5, marginBottom: 10 }}>
              <Tooltip placement="bottom" title="Add Movies">
                <Button
                  type="primary"
                  disabled={disableAddButton()}
                  onClick={() => handleAddClick()}
                >
                  <PlusOutlined />
                  Add
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="Update Movies">
                <Button
                  type="primary"
                  disabled={disableAddButton()}
                  onClick={() => updateMoviesDetails()}
                >
                  <PlusOutlined />
                  Update
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title="Select Row(s) to Delete">
                <Button
                  type="primary"
                  onClick={() => handleDeleteClick()}
                  disabled={state.newMovies.length !== 0}
                >
                  <DeleteOutlined />
                  Delete
                </Button>
              </Tooltip>
            </Space>
            <Space style={{ marginLeft: 5, marginBottom: 10 }}>
              <Tooltip placement="bottom" title="Save Movie Details">
                <Button
                  type="primary"
                  disabled={state.newMovies.length === 0}
                  onClick={() => saveNewMoviesDetails()}
                >
                  <SaveFilled />
                  Save
                </Button>
              </Tooltip>
            </Space>
          </div>
          <Table
            columns={tableColumns}
            dataSource={state.moviesData}
            pagination={false}
            bordered
            rowKey={'id'}
            rowSelection={rowSelection}
            rowClassName={(record) => {
              return state.filterTable.map((movie) =>
                record.movie_name === movie ? 'table-row-dark' : null,
              );
            }}
            scroll={{ x: 200, y: 400 }}
            size="small"
          />
          {statusModal}
          {actionModal}
        </div>{' '}
      </div>
    </div>
  );
};

export default MovieListPage;
