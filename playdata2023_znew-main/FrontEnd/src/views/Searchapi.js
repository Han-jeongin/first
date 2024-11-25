import axios from "axios";

export const selMenu = async (selectedMenu, keyword) => {
  if (selectedMenu && selectedMenu.value === "title") {
    try {
      const response = await axios.get(`http://3.37.47.118:8000/znew/search/?q=${keyword}&opt=title&st=ut&limit=10`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  } else if (selectedMenu && selectedMenu.value === "category") {
    try {
      const response = await axios.get(`http://3.37.47.118:8000/znew/search/?q=${keyword}&opt=category&st=ut&limit=10`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  } else if (selectedMenu && selectedMenu.value === "ch_name") {
    try {
      const response = await axios.get(`http://3.37.47.118:8000/znew/search/?q=${keyword}&opt=ch_name&st=ut&limit=10`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  } else{
    try {
      const response = await axios.get(`http://3.37.47.118:8000/znew/search/?q=${keyword}&opt=hashtag&st=ut&limit=10`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
};