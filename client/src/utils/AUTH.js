import axios from "axios";

export default {
  // Gets user info
  getUser: () => {
    return axios.get("/auth/user");
  },

  // Logs the user out
  logout: () => {
    return axios.post("/auth/logout");
  },

  // Log the user in
  login: function(username, password) {
    console.log("Got here!");
    return axios.post("/auth/login", { username, password });
  },

  searchUsers: query => {
    return axios.get("/auth/searchuser/" + query);
  },
  //usersearch/"+ query
  // getOtherGifts: function() {
  //   return axios.get("/api/gifts");
  // },
  updateUser: userData => {
    return axios.put("/auth/user", userData);
  },
  getLocation: () => {
    return axios.get("/auth/location");
  },
  // New user registration
  signup: userData => {
    return axios.post("/auth/signup", userData);
  },
  getUserLists: () => {
    return axios.get("/auth/user/lists")
  }
};
