import {
  Typography,
  Table,
  Card,
  Modal,
  Button,
  Pagination,
  Input,
  Radio,
  message,
  DatePicker,
  Select,
  Option,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Skeleton } from "antd";

const { Title } = Typography;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const ClassList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [totalStudent, setTotalStudent] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [flagEditForm, setFlagEditForm] = useState("");
  const [editedStudent, setEditedStudent] = useState(null);
  const [createStudent, setCreateStudent] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [bestTotalScore, setBestTotalScore] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleDeleteStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setIsDeleteModalVisible(true);
  };
  const classId = localStorage.getItem("classId");

  const [newStudent, setNewStudent] = useState({
    id_class: classId,
    name: "",
    dob: "",
    gender: "",
    average_score: "",
  });

  const showModal = (classData) => {
    setFlagEditForm("");
    setSelectedClass(classData);
    setIsModalVisible(true);
    localStorage.setItem("classId", classData.id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "Tên lớp học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng học sinh",
      dataIndex: "students",
      key: "students-count",
      render: (students) => students.length,
    },
    {
      title: "Hoc sinh có điểm trung bình cao nhất",
      dataIndex: "students",
      key: "best-score",
      render: (students) => {
        // in ra màn hình điểm trung bình cao nhất của mỗi lớp học và tên sinh viên có điểm cao nhất
        const bestScore = students.reduce((acc, cur) => {
          return acc.average_score > cur.average_score ? acc : cur;
        });
        return bestScore.name;
      },
    },
    {
      title: "Điểm trung bình cao nhất",
      dataIndex: "students",
      key: "best-score",
      render: (students) => {
        // in ra màn hình điểm trung bình cao nhất của mỗi lớp học và tên sinh viên có điểm cao nhất
        const bestScore = students.reduce((acc, cur) => {
          return acc.average_score > cur.average_score ? acc : cur;
        });
        return bestScore.average_score;
      },
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // loading tầm 1s

    fetch("https://exam.congdongcode.vn/api/list-class?id_user=4")
      .then((response) => response.json())
      // .then((data) => setData(data.data));
      .then((data) => {
        setData(data.data);

        const totalStudent = data.data.map((item) => {
          return item.students.length;
        });

        // điểm trung bình cao nhất của mỗi lớp học và tên sinh viên có điểm cao nhất
        const bestTotalScore = data.data.map((item) => {
          const bestScore = item.students.reduce((acc, cur) => {
            return acc.average_score > cur.average_score ? acc : cur;
          });
          return {
            nameStudent: bestScore.name,
            diemCaoNhat: bestScore.average_score,
          };
        });

        setTotalStudent(totalStudent);
        setBestTotalScore(bestTotalScore);
      });
  }, []);

  const editStudent = (studentId, updatedStudent) => {
    return fetch(`https://exam.congdongcode.vn/api/edit-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_student: updatedStudent.id,
        id_user: 4,
        name: updatedStudent.name,
        dob: updatedStudent.dob,
        gender: updatedStudent.gender,
        average_score: updatedStudent.average_score,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addStudent = (newStudent) => {
    return fetch(`https://exam.congdongcode.vn/api/create-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_class: classId,
        id_user: 4,
        name: newStudent.name,
        dob: newStudent.dob,
        gender: newStudent.gender,
        //average_score: ép kiểu về số
        average_score: parseInt(newStudent.average_score),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditStudent = (student, flag) => {
    setSelectedStudent(student);
    setEditedStudent({ ...student });
    setIsEditModalVisible(true);
  };
  const handleAddStudent = () => {
    setFlagEditForm("add");
    setNewStudent({
      id_class: classId,
      id_user: 4,
      name: "",
      dob: "",
      gender: "",
      average_score: "",
    });
    setIsAddModalVisible(true);
  };

  const deleteStudent = (studentId) => {
    return fetch(`https://exam.congdongcode.vn/api/delete-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_student: studentId,
        id_user: 4,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteOk = () => {
    deleteStudent(selectedStudentId)
      .then((response) => {
        console.log(response);
        setIsDeleteModalVisible(false);
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSaveStudent = () => {
    editStudent(selectedStudent.id, editedStudent)
      .then((response) => {
        console.log(response);
        setSelectedStudent(null);
        setEditedStudent(null);
        setIsEditModalVisible(false);
        message.success("Cập nhật thành công");
      })

      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddOk = () => {
    addStudent(newStudent)
      .then((response) => {
        console.log(response);
        setIsAddModalVisible(false);
        message.success("Thêm thành công");
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const totalClass = data.length;

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Danh sách lớp học với tổng số lớp: {totalClass}
        </Title>

        <Table columns={columns} dataSource={data} />
        <Modal
          // Danh sách học sinh của: lớp 1
          title={
            `Danh sách học sinh của: ${selectedClass?.name}` +
            " với sĩ số: " +
            selectedClass?.students.length
          }
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button type="primary" onClick={() => handleAddStudent()}>
              Thêm sinh viên
            </Button>,
          ]}
          width={800}
        >
          {selectedClass && (
            <div>
              <Title level={4}>{selectedClass.tenLopHoc}</Title>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedClass.students
                  .slice((currentPage - 1) * 6, currentPage * 6)
                  .map((student) => (
                    <>
                      <Card
                        style={{
                          width: 300,
                          borderRadius: 10,
                          border: "2px solid #1890ff",
                          marginBottom: 10,
                          marginRight: 10,
                          maxWidth: 300,
                          padding: 10,
                        }}
                        title={student.name}
                      >
                        <a style={{ marginRight: 10 }}>
                          {" "}
                          <Checkbox onChange={onChange}></Checkbox>
                        </a>
                        <br />
                        <a>Giới tính :</a>
                        <p>{student.gender}</p>
                        <a>Ngày sinh :</a>
                        <p>{student.dob}</p>
                        <a>Điểm trung bình :</a>
                        <p>{student.average_score}</p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 10,
                          }}
                        >
                          <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => handleEditStudent(student, "edit")}
                          >
                            Sửa
                          </Button>

                          <Button
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </Card>
                    </>
                  ))}
              </div>
              <Pagination
                current={currentPage}
                total={selectedClass.students.length}
                pageSize={5}
                onChange={handlePageChange}
                style={{ marginTop: "16px" }}
              />
            </div>
          )}
        </Modal>
        <Modal
          title="Sửa sinh viên"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setSelectedStudent(null);
                setEditedStudent(null);
                setIsEditModalVisible(false);
              }}
            >
              Hủy
            </Button>,
            <Button key="save" type="primary" onClick={handleSaveStudent}>
              Lưu
            </Button>,
          ]}
        >
          {editedStudent && (
            <div>
              <label htmlFor="name" required>
                <a>*</a>
                Tên sinh viên:
              </label>
              <Input
                value={editedStudent.name}
                onChange={(event) =>
                  setEditedStudent({
                    ...editedStudent,
                    name: event.target.value,
                  })
                }
              />
              <label>
                <a>*</a>
                Giới tính:
              </label>
              <div>
                <Radio.Group
                  onChange={(event) =>
                    setEditedStudent({
                      ...editedStudent,
                      gender: event.target.value,
                    })
                  }
                  value={editedStudent.gender}
                >
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              </div>
              <label htmlFor="dob">
                {" "}
                <a>*</a>Ngày sinh:
              </label>
              <br />
              <DatePicker
                value={moment(editedStudent.dob)}
                onChange={(date, dateString) => {
                  setEditedStudent({
                    ...editedStudent,
                    dob: dateString,
                  });
                }}
              />
              <br />

              <label htmlFor="average_score">
                {" "}
                <a>*</a>Điểm trung bình:
              </label>
              <br />
              <Input
                type="number"
                value={editedStudent.average_score}
                onChange={(event) =>
                  setEditedStudent({
                    ...editedStudent,
                    average_score: event.target.value,
                  })
                }
              />
            </div>
          )}
        </Modal>
        <Modal
          title="Xác nhận xoá sinh viên"
          visible={isDeleteModalVisible}
          onOk={handleDeleteOk}
          onCancel={() => setIsDeleteModalVisible(false)}
        >
          <p>Bạn có chắc chắn muốn xoá sinh viên này?</p>
        </Modal>
        <Modal
          title="Thêm sinh viên"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setNewStudent(null);
                setIsAddModalVisible(false);
              }}
            >
              Hủy
            </Button>,
            <Button key="save" type="primary" onClick={handleAddOk}>
              Lưu
            </Button>,
          ]}
        >
          {newStudent && (
            <div>
              <label htmlFor="name">
                <a>*</a>
                Tên sinh viên:
              </label>
              <Input
                value={newStudent.name}
                onChange={(event) =>
                  setNewStudent({ ...newStudent, name: event.target.value })
                }
              />
              <label>
                <a>*</a>
                Giới tính:
              </label>
              <div>
                <Radio.Group
                  onChange={(event) =>
                    setNewStudent({
                      ...newStudent,
                      gender: event.target.value,
                    })
                  }
                  value={newStudent.gender}
                >
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                </Radio.Group>
              </div>
              <label htmlFor="dob">
                {" "}
                <a>*</a>Ngày sinh:
              </label>
              <br />

              <DatePicker
                onChange={(date, dateString) => {
                  setNewStudent({
                    ...newStudent,
                    dob: dateString,
                  });
                }}
              />

              <br />
              <label htmlFor="average_score">
                {" "}
                <a>*</a>Điểm trung bình:
              </label>
              <br />
              <Input
                type="number"
                value={newStudent.average_score}
                onChange={(event) =>
                  setNewStudent({
                    ...newStudent,
                    average_score: event.target.value,
                  })
                }
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ClassList;
