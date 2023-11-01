import axiosInstance from 'src/config/axiosConfig';
import {Friend} from 'src/types/friend';

export default class FriendService {
  static createFriend = async (receiverUserId: string): Promise<Friend> => {
    const response = await axiosInstance.post<Friend>(`/friends`, {
      receiverUserId: receiverUserId,
    });
    return response.data;
  };
  static patchFriend = async (idFriend: string): Promise<Friend> => {
    const response = await axiosInstance.patch<Friend>(`/friends/${idFriend}`, {
      connected: true,
    });
    return response.data;
  };
}
