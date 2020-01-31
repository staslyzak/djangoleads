import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};

const API = {
  leads: {
    getLeads: tokenHeader =>
      axios.get(`/api/leads`, {
        headers: {
          ...headers,
          ...tokenHeader
        }
      }),
    deleteLead: (id, tokenHeader) =>
      axios.delete(`/api/leads/${id}/`, {
        headers: {
          ...headers,
          ...tokenHeader
        }
      }),
    createLead: (data, tokenHeader) =>
      axios.post(`/api/leads/`, data, {
        headers: {
          ...tokenHeader
        }
      })
  },
  auth: {
    loadUser: tokenHeader =>
      axios.get(`/api/auth/user`, {
        headers: {
          ...headers,
          ...tokenHeader
        }
      }),
    login: data =>
      axios.post(`/api/auth/login`, data, {
        headers: headers
      }),
    register: data =>
      axios.post(`/api/auth/register`, data, {
        headers: headers
      }),
    logout: tokenHeader =>
      axios.post(`api/auth/logout`, null, {
        headers: {
          ...tokenHeader
        }
      })
  }
};

export default API;
