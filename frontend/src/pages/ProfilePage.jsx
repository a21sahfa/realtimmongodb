import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProBild, updateProBild } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleBildUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Bild = reader.result;
      setSelectedImg(base64Bild);
      await updateProBild({ profilBild: base64Bild });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-6 space-y-8 border border-gray-700 shadow-xl">

          <div className="text-center">
            <h1 className="text-2xl font-semibold text-indigo-300">Profile</h1>
            <p className="mt-2 text-sm text-gray-400">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilBild || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-indigo-500 hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProBild ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBildUpload}
                  disabled={isUpdatingProBild}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProBild ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-gray-700 text-white">
                {authUser?.namn}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-800 rounded-lg border border-gray-700 text-white">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-medium mb-4 text-indigo-300">Account Information</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
