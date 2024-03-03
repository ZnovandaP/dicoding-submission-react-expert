import axios from 'axios';
import { baseUrl } from '../common/fetch-with-auth';

const getLeaderboards = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/leaderboards`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getLeaderboards;
