import axios from "axios";

const API_URL = 'http://localhost:8081/contacts';
const EVENTS_URL = 'http://localhost:8081/events'; // Add events endpoint URL


export async function saveContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateContact(contact) {
    return await axios.post(API_URL, contact);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}

export async function getAllEvents(page = 0, size = 10) {
    return await axios.get(`${EVENTS_URL}?page=${page}&size=${size}`);
  }
  
  export async function getEvent(id) {
    return await axios.get(`${EVENTS_URL}/${id}`);
  }
  
  export async function createEvent(event) {
    return await axios.post(EVENTS_URL, event);
  }
  
  export async function updateEvent(id, updatedEvent) {
    return await axios.put(`${EVENTS_URL}/${id}`, updatedEvent);
  }
  
  export async function deleteEvent(id) {
    return await axios.delete(`${EVENTS_URL}/${id}`);
  }