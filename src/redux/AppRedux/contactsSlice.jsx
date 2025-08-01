
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  retrieveApiKey,
  getApiKey,
} from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
};

const handleKeyPending = state => {
  state.contacts.isKeyLoading = true;
  state.contacts.error = null;
};

const handleKeyRejected = (state, action) => {
  state.contacts.isKeyLoading = false;
  state.contacts.error = action.payload;
};
const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      isKeyLoading: false,
      error: null,
      val: null,
      valName: null,
      valId: null,
      valDate: null,
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(getApiKey.pending, handleKeyPending)
      .addCase(getApiKey.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.val = action.payload.key;
      })
      .addCase(getApiKey.rejected, handleKeyRejected)
      .addCase(retrieveApiKey.pending, handlePending)
      .addCase(retrieveApiKey.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.val = action.payload.apiKey;
        state.contacts.valName = action.payload.apiKeyName;
        state.contacts.valId = action.payload.apiAccountId;
        state.contacts.valDate = action.payload.apiCreationDate;
      })
      .addCase(retrieveApiKey.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          item => item._id === action.payload
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});



export const contactsReducer = contactsSlice.reducer;