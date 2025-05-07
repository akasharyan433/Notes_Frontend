import api from './api';

/**
 * Note service functions for interacting with the notes API
 * Each function handles a specific CRUD operation for notes
 */

/**
 * Fetch all notes for the authenticated user
 * @returns {Promise<Array>} Array of note objects
 */
export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

/**
 * Fetch a single note by ID
 * @param {string} id - Note ID
 * @returns {Promise<Object>} Note object
 */
export const getNote = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

/**
 * Create a new note
 * @param {Object} noteData - Note data (title, content, etc.)
 * @returns {Promise<Object>} Created note object
 */
export const createNote = async (noteData) => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

/**
 * Update an existing note
 * @param {string} id - Note ID
 * @param {Object} noteData - Updated note data
 * @returns {Promise<Object>} Updated note object
 */
export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

/**
 * Delete a note
 * @param {string} id - Note ID
 * @returns {Promise<Object>} Deletion response
 */
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};