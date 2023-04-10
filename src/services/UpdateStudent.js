export const editStudent = (studentId, updatedStudent) => {
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
