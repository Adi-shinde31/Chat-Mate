import { create } from 'zustand';
import toast from "react-hot-toast";

import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data})
        } catch (e) {
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data});
            toast.success('Account Created Successfully');
        } catch (e) {
            toast.error(e.response.data.message);
        } finally{
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try{
            const res = await axiosInstance.post('/auth/login', data);
            set({authUser: res.data});
            toast.success('Logged in Successfully');
        } catch (e) {
            toast.error(e.response.data.message);
        } finally{
            set({isLoggingIn: false});
        }
    },

    logout: async () => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success('Logged Out Successfully');
        } catch (e) {
            toast.error(e.response.data.message);
        }
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