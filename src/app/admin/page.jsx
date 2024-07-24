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
    // if (!user || !user.roles.includes("admin")) {
    //   router.push("/login"); // Redirect to login if not authenticated or not an admin
    // } else {
    fetchUsers();
    // }
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

  if (!user || !user.roles.includes("admin")) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[50px] px-5 bg-lighter dark:bg-dark">
      <h1 className="text-2xl font-semibold mb-4">Admin Page</h1>
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
  );
};

export default Admin;
