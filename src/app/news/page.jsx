"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { MdAddCircleOutline, MdEdit, MdDelete } from "react-icons/md";

const News = () => {
  const { user } = useAuth();
  const [newsItems, setNewsItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleAddNews = async (e) => {
    e.preventDefault();

    const newNewsItem = {
      title,
      content,
      author: `${user.firstName} ${user.lastName}`,
    };

    console.log("Adding news item:", newNewsItem);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNewsItem),
      });

      if (response.ok) {
        const addedNewsItem = await response.json();
        setNewsItems([...newsItems, addedNewsItem]);
        setIsEditing(false);
      } else {
        console.error("Failed to add news item");
      }
    } catch (error) {
      console.error("Error adding news item:", error);
    }
  };

  const handleEditNews = (index) => {
    const item = newsItems[index];
    setEditIndex(index);
    setTitle(item.title);
    setContent(item.content);
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const updatedNewsItem = {
      title,
      content,
      author: newsItems[editIndex].author,
    };

    // console.log("Updating news item:", updatedNewsItem);

    try {
      const response = await fetch(`/api/news/${newsItems[editIndex]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNewsItem),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        const updatedNewsItems = [...newsItems];
        updatedNewsItems[editIndex] = updatedItem;
        setNewsItems(updatedNewsItems);
        setIsEditing(false);
      } else {
        console.error("Failed to update news item");
      }
    } catch (error) {
      console.error("Error updating news item:", error);
    }
  };

  const handleDeleteNews = async (index) => {
    try {
      const response = await fetch(`/api/news/${newsItems[index]._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedNewsItems = newsItems.filter((_, i) => i !== index);
        setNewsItems(updatedNewsItems);
        setShowDeleteConfirm(false);
      } else {
        console.error("Failed to delete news item");
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    }
  };

  const toggleDeleteConfirm = (index) => {
    setShowDeleteConfirm(!showDeleteConfirm);
    setEditIndex(index);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          NTA <span className="text-secondary dark:text-primary">News</span>.
        </h1>

        <p className="max-w-sm text-lg mx-auto font-semibold mb-2">
          Check here for updates
          <br />
          about upcoming NTA events.
        </p>

        {user && user.roles.includes("admin") && (
          <MdAddCircleOutline
            className="text-4xl cursor-pointer absolute top-16 right-8 text-primary hover:brightness-110"
            onClick={() => {
              setIsEditing(true);
              setEditIndex(null);
              setTitle("");
              setContent("");
            }}
          />
        )}

        {isEditing ? (
          <div className="absolute top-16 right-5 bg-white dark:bg-black p-6 rounded-xl shadow-md z-50 w-[90%] flex flex-col mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              {editIndex === null ? "Add News Item" : "Edit News Item"}
            </h2>
            <form
              onSubmit={editIndex === null ? handleAddNews : handleSaveEdit}
            >
              <div className="mb-4">
                <label className="block text-left mb-2 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md border border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-left mb-2 font-semibold">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md border border-gray-300 dark:border-gray-600 h-[300px]"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary-dark"
                >
                  {editIndex === null ? "Submit" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {newsItems.map((item, index) => {
              const date = new Date(item.date);
              const dayOfWeek = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <div
                  key={index}
                  className="relative bg-white dark:bg-black p-4 rounded-xl w-full shadow-md mb-4"
                >
                  {user && user.roles.includes("admin") && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      <MdEdit
                        className="text-xl cursor-pointer text-secondary hover:text-secondary-dark"
                        onClick={() => handleEditNews(index)}
                      />
                      <MdDelete
                        className="text-xl cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => toggleDeleteConfirm(index)}
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2 text-left dark:text-primary text-secondary">
                    {item.title}
                  </h2>
                  <p className="text-base text-left">{item.content}</p>
                  <div className="flex w-full items-center justify-between border-t border-gray-500 mt-2">
                    <p className="pt-2 text-left text-xs dark:text-secondary text-primary">
                      {item.author}
                    </p>
                    <p className="pt-2 text-right text-xs dark:text-secondary text-primary">
                      {dayOfWeek}, {formattedDate} at {formattedTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="w-[100vw] h-[100vh] z-50 flex justify-center items-center top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black dark:bg-white dark:bg-opacity-30">
          <div className="bg-white dark:bg-black shadow-md z-50 flex justify-center pb-3 my-0 flex-col text-2xl rounded-xl p-10">
            <p className="mb-2 text-xl font-semibold text-center">
              Delete this news item?
            </p>
            <p className="text-lg mb-4 text-secondary text-center">
              This action cannot be reversed.
            </p>
            <div className="flex gap-x-4 pb-8 w-full items-center justify-center">
              <button
                onClick={() => handleDeleteNews(editIndex)}
                className="border border-gray-500 px-4 py-2 rounded-lg mr-2 transition-all duration-300 bg-secondary text-lighter dark:text-darker hover:brightness-125 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
