export const addStudent = (newStudent) => {
  const classId = localStorage.getItem("classId");
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
