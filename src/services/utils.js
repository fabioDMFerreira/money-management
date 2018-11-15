export const generateKey = pre => `${pre}_${new Date().getTime()}`;

export const extractDataFromApiRequest = response => response.data;
