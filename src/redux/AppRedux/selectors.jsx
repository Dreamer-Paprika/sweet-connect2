export const selectContacts = state => state.contacts.contacts.items;

export const selectContactsFilter = state => state.filter;

export const selectIsLoading = state => state.contacts.contacts.isLoading;

export const selectIsKeyLoading = state => state.contacts.contacts.isKeyLoading;

export const selectError = state => state.contacts.contacts.error;

export const selectVal = state => state.contacts.contacts.val;

export const selectValName = state => state.contacts.contacts.valName;

export const selectValId = state => state.contacts.contacts.valId;

export const selectValDate = state => state.contacts.contacts.valDate;