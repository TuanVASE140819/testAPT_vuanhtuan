export const getRoom = () => {
  return fetch(`https://exam.congdongcode.vn/api/list-class?id_user=4`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
