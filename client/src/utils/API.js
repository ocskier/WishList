import axios from "axios";

export default {
  // Gets all books
  getItems: function() {
    return axios.get("/api/items");
  },
  // Gets the Item with the given id
  getItem: function(id) {
    return axios.get("/api/items/" + id);
  },
  // Deletes the Item with the given id
  deleteItem: function(id) {
    return axios.delete("/api/items/" + id);
  },
  // Saves a Item to the database
  saveItem: function(ItemData) {
    return axios.post("/api/items", ItemData);
  },

  getWishlists: function() {
    return axios.get("/api/wishlists");
  },
  // Gets the Wishlist with the given id
  getWishlist: function(id) {
    return axios.get("/api/wishlists/" + id);
  },
  // Deletes the Wishlist with the given id
  deleteWishlist: function(id) {
    return axios.delete("/api/wishlists/" + id);
  },
  // Saves a Wishlist to the database
  saveWishlist: function(WishlistData) {
    return axios.post("/api/wishlists", WishlistData);
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

};
