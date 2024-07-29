"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { MdAddCircleOutline, MdEdit, MdDelete, MdClose } from "react-icons/md";
import { Spinner } from "@material-tailwind/react";

const News = () => {
  const { user } = useAuth();
  const [newsItems, setNewsItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsItems(data.reverse()); // Reverse the order of news items
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
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

    try {
      setLoading(true);
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNewsItem),
      });

      if (response.ok) {
        const addedNewsItem = await response.json();
        setNewsItems([addedNewsItem, ...newsItems]);
        setIsEditing(false);
      } else {
        console.error("Failed to add news item");
      }
    } catch (error) {
      console.error("Error adding news item:", error);
    } finally {
      setLoading(false);
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

    if (editIndex === null || newsItems[editIndex] === undefined) {
      console.error("Invalid editIndex or news item is undefined");
      return;
    }

    const updatedNewsItem = {
      title,
      content,
      author: newsItems[editIndex].author,
    };

    try {
      setLoading(true);
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
        setEditIndex(null); // Reset the editIndex after editing
      } else {
        console.error("Failed to update news item");
      }
    } catch (error) {
      console.error("Error updating news item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async () => {
    if (editIndex === null || newsItems[editIndex] === undefined) {
      console.error("Invalid editIndex or news item is undefined");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/news/${newsItems[editIndex]._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedNewsItems = newsItems.filter((_, i) => i !== editIndex);
        setNewsItems(updatedNewsItems);
        setShowDeleteConfirm(false);
        setEditIndex(null); // Reset the editIndex after deletion
      } else {
        console.error("Failed to delete news item");
      }
    } catch (error) {
      console.error("Error deleting news item:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDeleteConfirm = (index) => {
    setShowDeleteConfirm(!showDeleteConfirm);
    setEditIndex(index);
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center h-full mx-auto w-full">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          NTA <span className="text-secondary dark:text-primary">News</span>.
        </h1>

        {user && user.roles.includes("admin") ? (
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="border border-gray-500 flex px-2 py-1 rounded-lg items-center justify-center shadow-sm shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none font-semibold text-lg gap-x-3 w-fit"
              onClick={() => {
                setIsEditing(true);
                setEditIndex(null);
                setTitle("");
                setContent("");
              }}
            >
              <MdAddCircleOutline className="text-2xl" />
              Add News
            </button>{" "}
          </div>
        ) : (
          <p className="max-w-sm text-lg mx-auto font-semibold mb-2">
            Check here for updates
            <br />
            about upcoming NTA events.
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center w-full">
            <Spinner className="h-12 w-12" color="blue" />
          </div>
        ) : isEditing ? (
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
              <div className="flex flex-col gap-y-2 w-full">
                {loading ? (
                  <button
                    type="button"
                    disabled
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl justify-center font-semibold flex items-center"
                  >
                    <Spinner className="h-4 w-4 dark:text-primary text-secondary font-bold mr-3" />{" "}
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-md shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                  >
                    SAVE
                  </button>
                )}
                <div className="flex gap-x-5 mt-10">
                  {showDeleteConfirm ? (
                    <div className="w-[100vw] h-[100vh] z-50 flex justify-center items-center top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black dark:bg-white dark:bg-opacity-30">
                      <div className="bg-white dark:bg-black shadow-md z-50 flex justify-center pb-3 my-0 flex-col text-2xl rounded-xl p-10">
                        <p className="mb-2 text-xl font-semibold">
                          Delete this news item?
                        </p>
                        <p className="text-lg mb-4 text-secondary">
                          This action cannot be reversed.
                        </p>
                        <div className="flex gap-x-4 pb-8 w-full items-center justify-center">
                          <button
                            onClick={handleDeleteNews}
                            className="border border-gray-500 px-4 py-2 rounded-lg mr-2 transition-all duration-300 bg-secondary text-lighter dark:text-darker hover:brightness-125 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={toggleDeleteConfirm}
                            className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex w-full items-center justify-end">
                    <button
                      onClick={onCancelEdit}
                      className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                    >
                      <MdClose className="text-2xl mr-3 self-end" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
            {newsItems.map((item, index) => {
              const date = new Date(item.date);
              const dayOfWeek = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "2-digit",
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
                    <div className="absolute w-full -top-3 right-0 flex items-center justify-between">
                      <MdDelete
                        className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => toggleDeleteConfirm(index)}
                      />
                      <MdEdit
                        className="text-2xl cursor-pointer text-secondary hover:text-secondary-dark"
                        onClick={() => handleEditNews(index)}
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold mb-2 text-left dark:text-primary text-secondary">
                    {item.title}
                  </h2>
                  <p className="text-base text-left">{item.content}</p>
                  <div className="flex w-full items-center justify-between border-t border-gray-500 mt-4">
                    <p className="pt-2 text-left text-sm dark:text-secondary text-primary">
                      {item.author}
                    </p>
                    <p className="pt-2 text-right text-sm dark:text-secondary text-primary">
                      {formattedDate} @ {formattedTime}
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
                onClick={handleDeleteNews}
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
