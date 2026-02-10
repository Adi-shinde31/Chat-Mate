import { create } from 'zustand';
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

import { axiosInstance } from '../lib/axios.js';

export const useAuthStore = create((set, get) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            get().connectSocket();
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success('Account Created Successfully');
            get().connectSocket();
        } catch (e) {
            toast.error(e?.response?.data?.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success('Logged in Successfully');
            get().connectSocket();
        } catch (e) {
            toast.error(e?.response?.data?.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logged Out Successfully');
            get().disconnectSocket();
        } catch (e) {
            toast.error(e?.response?.data?.message);
        } finally {
            set({ isLoggingOut: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success('Profile Updated Successfully');
        } catch (e) {
            toast.error(e?.response?.data?.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        
        const socket = io('http://localhost:3000', {
            query: { userId: authUser._id },
        });
        socket.connect();
        set({ socket: socket });
        socket.on("getOnlineUsers", (users) => {
            set({ onlineUsers: users });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
            set({ socket: null });
        }
    }
}));
