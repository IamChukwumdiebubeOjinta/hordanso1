import Axios from "axios";

class Services {
  async getEndPoint(uri: string, req: any = {}): Promise<any> {
    const endPoint = uri;
    let config = {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        // 'Authorization': `Basic ${session_token}`,
      },
    };

    try {
      const res = await Axios.get(endPoint, req);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  async postEndPoint(uri: string, req: any = {}) {
    const endPoint = uri;
    let config = {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        // 'Authorization': `Basic ${session_token}`,
      },
    };

    try {
      const res = await Axios.post(endPoint, req);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

const apiCall = new Services
export default apiCall