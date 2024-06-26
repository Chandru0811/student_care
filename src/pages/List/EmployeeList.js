import toast from "react-hot-toast";
import api from "../../config/URL";


const fetchAllEmployeeListByCenter = async (id) => {
  try {
    const response = await api.get(`getUserListByStudentCareId/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching Employee data:", error);
    throw error;
  }
};

export default fetchAllEmployeeListByCenter;
