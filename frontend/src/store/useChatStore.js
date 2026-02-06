import { create } from 'zustand';
import toast from "react-hot-toast";

import { axiosInstance } from '../lib/axios.js';

export const useChatStore = create((set) => ({
    message: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: true,

    getUsers: async () => {
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get('/messages/users');
            set({users: res.data})
        } catch (e) {
            toast.error(e.response.data.message);
        } finally{
            set({isUsersLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true});
        try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (e) {
            toast.error(e.response.data.message);
        } finally{
            set({isMessagesLoading:false})
        }
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser});
    },

    clearSelectedUser: () => {
        set({selectedUser: null});
    },




    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({authUser: res.data});
            toast.success('Profile Updated Successfully');
        } catch (e) {
            toast.error(e.response.data.message);
        } finally{
            set({isUpdatingProfile: false});
        }
    },

}))