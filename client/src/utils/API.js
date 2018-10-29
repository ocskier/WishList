import axios from "axios";

export default {
  // Gets all books
  getGifts: function() {
    return axios.get("/api/Gifts");
  },
  // Gets the Gift with the given id
  getGift: function(id) {
    return axios.get("/api/Gifts/" + id);
  },
  // Deletes the Gift with the given id
  deleteGift: function(id) {
    return axios.delete("/api/Gifts/" + id);
  },
  // Gets the Wishlist with the given id
  getList: function(id) {
    return axios.get("/api/lists/" + id);
  },
  // Deletes the Wishlist with the given id
  deleteList: function(id) {
    return axios.delete("/api/lists/" + id);
  },
  // Saves a Wishlist to the database
  
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  getUserGifts: function(user_id) {
    return axios.get("/api/lists/"+user_id);
  },
  // getOtherGifts: function() {
  //   return axios.get("/api/gifts");
  // },
  // Gets the book with the given id

  // Saves a book to the database
  saveGift: (giftData) => {return axios.post("/api/gifts", giftData)},
  updateList: (id,listData) => {return axios.put("/api/lists/"+id,listData)},
  getLists: () => {return axios.get("/api/lists")},
  makeList: (user) => {return axios.post('/api/lists',user)}
};
