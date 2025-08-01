import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Notiflix from 'notiflix';


export const getApiKey = createAsyncThunk(
  'contacts/getApiKey',
  async ({
          name,
          customMetaData,
          customAccountId
  }, thunkAPI) => {
   
    try {
      const res = await axios.post('/contacts/key', {
        name,
        customMetaData,
        customAccountId,
      });
      alert("API KEY CREATED, CHECK HOMEPAGE for DETAILS");
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const retrieveApiKey = createAsyncThunk(
  'contacts/retrieveKey',
  async (_, thunkAPI) => {
    Notiflix.Loading.pulse('Loading data, please wait...', {
      svgColor: '#FFB8CA',
      fontFamily: 'DM Sans',
    });
    try {
      const res = await axios.get('/contacts/retrieve');
      //console.log(res.data);
      Notiflix.Loading.remove();
      return res.data;
    } catch (error) {
      Notiflix.Loading.remove();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get('/contacts');
        //console.log (response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
      const state = thunkAPI.getState();
      const valKey = state.contacts.contacts.val;
    try {
      const response = await axios.post(`/contacts/${valKey}`, { name, phone });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);



export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (taskId, thunkAPI) => {
    const state = thunkAPI.getState();
    const valKey = state.contacts.contacts.val;
    try {
      const response = await axios.delete(`/contacts/${taskId}/${valKey}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);          

                                          