"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct hook for app directory
import { useAuth } from "../../context/AuthContext";
import UserCard from "../../components/UserCard";

const Admin = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [user, router]);

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

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Admin <span className="text-secondary dark:text-primary">Tools</span>.
        </h1>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard key={user._id} user={user} fetchUsers={fetchUsers} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
