import axios from "axios";

export default {
  // Gets all books
  getUserGifts: function(user_id) {
    return axios.get("/api/gifts/"+user_id);
  },
  // getOtherGifts: function() {
  //   return axios.get("/api/gifts");
  // },
  // Gets the book with the given id
  getGift: function(id) {
    return axios.get("/api/gifts/" + id);
  },
  // Deletes the book with the given id
  deleteGift: function(id) {
    return axios.delete("/api/gifts/" + id);
  },
  // Saves a book to the database
  saveGift: (giftData) => {return axios.post("/api/gifts", giftData)},
  getLists: () => {return axios.get("/api/lists")},
  makeList: (user) => {return axios.post('/api/lists',user)}
};
