export const deleteStudent = (studentId) => {
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
