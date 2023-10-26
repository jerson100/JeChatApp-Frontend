import axiosInstance from 'config/axiosConfig';
import {decode} from 'base-64';
import {User} from 'src/types/user';
import {AxiosRequestConfig} from 'axios';

interface ImageUpload {
  uri: string;
  type: string;
  name: string;
}

export default class UserService {
  static async uploadProfileImage(
    {type, uri, name}: ImageUpload,
    idUser: string,
  ): Promise<string> {
    // const blob = new Blob([decode(uri)], {type, lastModified: Date.now()});
    const d = new FormData();
    d.append('image', {
      uri: uri,
      name: name,
      type: type,
    });
    const response = await axiosInstance.patch(`/users/${idUser}`, d, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return response.data.urlImageProfile;
  }
  static async getAllSearchingUsers(
    username: string,
    config?: AxiosRequestConfig,
  ): Promise<User[]> {
    let _config = config ? config : {};
    const response = await axiosInstance.get<User[]>('/users', {
      ..._config,
      params: {username: username},
    });
    return response.data;
  }
}
