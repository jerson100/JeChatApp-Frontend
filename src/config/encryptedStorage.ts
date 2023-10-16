import EncryptedStorage from 'react-native-encrypted-storage';

type keyType = 'AUTH_TOKEN';

export const setItem = async (key: keyType, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (e) {}
};

export const getItem = async (key: keyType) => {
  try {
    return await EncryptedStorage.getItem(key);
  } catch (e) {}
};

export const removeItem = async (key: keyType) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {}
};

export const clear = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (e) {}
};

const EncryptedSecureStorage = {
  setItem,
  getItem,
  removeItem,
  clear,
};

export default EncryptedSecureStorage;
