import authAxios from "./Interceptors";

const getUserDashBoard = () => {
  return authAxios.get(`/user/home`);
};

const submitContactDetails = (contactDetails, image) => {
  let { name } = { ...contactDetails };
  submitContactImage(name, image);
  return authAxios.post(`/user/add/contact`, contactDetails);
};
const submitContactImage = (name, image) => {
  console.log(name);
  console.log(image);
  let formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  for (var pair of formData.entries()) {
    console.log(pair[0] + " - " + pair[1]);
  }
  const config = {
    headers: { "Content-type": "multipart/form-data" },
  };

  authAxios
    .post(`/user/contact/image`, formData, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const viewContacts = () => {
  return authAxios.get("/user/show-contacts");
};

const getSingleContact = (cid) => {
  return authAxios.get(`user/contact/${cid}`);
};

const updateSingleContact = ({ ...singleContact }) => {
  return authAxios.put(`user/update/contact`, singleContact);
};

const updateProfileName = (fullname) => {
  let username = {
    name: fullname,
  };
  return authAxios.post(`user/profile/info/name`, username);
};

const updateProfileEmail = (email) => {
  let useremail = {
    email,
  };

  return authAxios.post(`user/profile/info/email`, useremail);
};

const deleteContact = (cid) => {
  return authAxios.delete(`user/delete/contact/${cid}`);
};

const getAdminDashBoard = () => {
  return authAxios.get(`/admin/home`);
};

const updateProfileImage = () => {};

export default {
  getUserDashBoard,
  getAdminDashBoard,
  submitContactDetails,
  submitContactImage,
  viewContacts,
  getSingleContact,
  updateProfileName,
  updateProfileEmail,
  updateSingleContact,
  updateProfileImage,
  deleteContact,
};
