import { useState } from "react";
import { Camera, User, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfileUpdatePage = () => {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedFile(base64Image);
            await updateProfile({ profilePicture: base64Image });
        };
    };

    if (!authUser) return null;

    return (
        <div className="flex-1 flex items-center justify-center bg-base-200 p-4">
            {/* Card container */}
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center gap-4">
                    <h2 className="card-title text-2xl">Profile</h2>
                    <p className="text-sm text-base-content/70">
                        Your profile information
                    </p>

                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={selectedFile || authUser.profilePicture || "/avatar.jpg"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border"
                        />

                        <label
                            htmlFor="profileImageUpload"
                            className="absolute bottom-0 right-0 btn btn-circle btn-sm"
                        >
                            <Camera size={16} />
                            <input
                                id="profileImageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <p className="text-xs text-base-content/60">
                        {isUpdatingProfile
                            ? "Updating profile picture..."
                            : "Click the camera icon to update your picture"}
                    </p>

                    {/* User info */}
                    <div className="w-full space-y-4 mt-4 flex flex-col items-center">
                        <div className="flex items-center justify-center gap-3">
                            <User size={16} />
                            <span className="font-medium">Name:</span>
                            <span>{authUser.fullName}</span>
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <Mail size={16} />
                            <span className="font-medium">Email:</span>
                            <span className="truncate max-w-[220px] text-center">
                                {authUser.email}
                            </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="font-medium">Member since:</span>
                            <span>
                                {new Date(authUser.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <span className="font-medium">Status:</span>
                            <span className="badge badge-success badge-outline">
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdatePage;
