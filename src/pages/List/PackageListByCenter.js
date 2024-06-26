import toast from "react-hot-toast";
import api from "../../config/URL";

const fetchAllPackageListByCenter = async (id) => {
  try {
    const response = await api.get(
      `getStudentCarePackageIdsAndNamesByStudentCareId/${id}`
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching Course data:", error);
    throw error;
  }
};

export default fetchAllPackageListByCenter;
