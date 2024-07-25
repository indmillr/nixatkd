"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import UserCard from "../../components/UserCard";
import { Spinner } from "@material-tailwind/react";

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user.roles.includes("admin")) {
      router.push("/");
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, user, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
        handleCancelEdit();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Admin <span className="text-secondary dark:text-primary">Tools</span>.
        </h1>

        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner className="h-6 w-6 dark:text-primary text-secondary font-bold mr-3" />{" "}
            <p className="text-lg font-semibold">Loading users...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                fetchUsers={fetchUsers}
                isEditing={editingUserId === user._id}
                onEditUser={() => handleEditUser(user._id)}
                onCancelEdit={handleCancelEdit}
                onDeleteUser={() => handleDeleteUser(user._id)}
                isAnyUserEditing={editingUserId !== null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
