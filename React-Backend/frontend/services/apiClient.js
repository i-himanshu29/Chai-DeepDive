class ApiClient {
  constructor() {
    this.baseURL = "http://127.0.0.1:8000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config = {
        ...options,
        headers,
        creadentials: "include",
      };
      console.log(`Fetching ${url}`);
      console.log("config:",config)
      const response = await fetch(url, config);
      console.log("config",config)
      console.log("response:",response);
      //check if response.ok=== value
      const data = await response.json();
      console.log("data:",data)
      return data;

    } catch (error) {
      console.log("API Error", error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(name,username,email,password){
    return this.customFetch("/users/register",{
        method:"POST",
        body:JSON.stringify({name,username,email,password})
    });
  }
  async login(email,password){
    return this.customFetch("/users/login",{
        method:"POST",
        body:JSON.stringify({email,password})
    });
  }

  async getProfile(){
    return this.customFetch("/users/profile")
  }

}

const apiClient = new ApiClient()
export default apiClient;