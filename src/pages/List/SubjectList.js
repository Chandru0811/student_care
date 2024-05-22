import { toast } from "react-toastify";
import api from "../../config/URL";

const fetchAllSubjectsWithIds = async () => {
  try {
    const response = await api.get("getAllSubjectsWithIds");
    return response.data;
  } catch (error) {
    toast.error("Error fetching center data:", error);
    throw error;
  }
};

export default fetchAllSubjectsWithIds;
