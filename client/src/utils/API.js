import axios from "axios";

export default {
  // Gets all books
  getGifts: (id) => {return axios.get("/api/lists/"+id)}
  ,
  // Searches Etsy
  searchAll: () => {return axios.get("/api/search")},

  // Searches Ebay
  searchEbay: (word) => 
      {return axios.get("/api/search/eb/"+word)}
  ,
  
  // Gets the Gift with the given id
  getGift: (id) => {return axios.get("/api/gifts/" + id)},
  
  // Deletes the Gift with the given id
  deleteGift: (id) => {return axios.delete("/api/gifts/" + id)},
  
  // Gets the Wishlist with the given id
  getList: (id) => {return axios.get("/api/lists/" + id)},
  
  // Deletes the Wishlist with the given id
  deleteList: (id) => {return axios.delete("/api/lists/" + id)},
  
  // Saves a Wishlist to the database
  
  searchUsers: (query) => {return axios.get("/api/users/searchuser/" + query)},
  //usersearch/"+ query
  // getOtherGifts: function() {
  //   return axios.get("/api/gifts");
  // },
  // Gets the book with the given id
  getUser: (id) => {return axios.get("/api/users/userid/" + id)},

  // Saves a gift to the database
  saveGift: (giftData) => {return axios.post("/api/gifts", giftData)},
  
  updateGift: (id,giftData) => {return axios.put("/api/gifts/" + id,giftData)},
  
  updateList: (id,listData) => {return axios.put("/api/lists/"+id,listData)},
  
  getLists: () => {return axios.get("/api/lists")},
  
  makeList: (user) => {return axios.post('/api/lists',user)},
  getLocation: () => {return axios.get("/api/users/location")}
};
