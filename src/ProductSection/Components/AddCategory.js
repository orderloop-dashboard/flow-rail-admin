import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function AddCategory({ setShowCategoryPopup, category, fetchAllProduct, showCategoryPopup }) {
    const [collectionName, setCollectionName] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://florail-backend.vercel.app/api/category/create-category`, { name: collectionName, category: showCategoryPopup });

            if (response.status === 200) {
                setShowCategoryPopup(false);
            }
        } catch (error) {
            console.error("Error creating collection:", error);
            alert("Failed to create collection");
        }
    };

    const [newCategoryName, setNewCategoryName] = useState("");

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleNameChange = (e) => {
        setNewCategoryName(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://florail-backend.vercel.app/api/category/edit-category`, {
                oldName: selectedCategory,
                newName: newCategoryName,
                category: showCategoryPopup,
            });

            if (response.status === 200) {
                fetchAllProduct();
            }

            console.log("response ==>", response);
        } catch (error) {
            console.error("Error updating category", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.put(`https://florail-backend.vercel.app/api/category/delete-category`, { name: deleteCategory, category: showCategoryPopup });

            if (response.status === 200) {
                fetchAllProduct();
            }

            console.log("response ==>", response);
        } catch (error) {
            console.error("Error updating category", error);
        }
    };

    const [deleteCategory, setDeleteCategory] = useState("");

    const handleDeleteCategoryChange = (e) => {
        setDeleteCategory(e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 px-6">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Add category</h2>
                    <button onClick={() => setShowCategoryPopup(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                <div className=" mb-6 pb-6 border-b border-neutral-300">
                    <select value={selectedCategory} onChange={handleCategoryChange} className="border border-neutral-300 px-3 py-1 w-fit rounded-lg mt-3">
                        <option value="">Select a category</option>
                        {category.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    {selectedCategory && (
                        <div className="flex justify-between items-center mt-2">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={handleNameChange}
                                className="px-3 py-1 border border-neutral-300 rounded-lg w-[80%] "
                                placeholder="Enter new category name"
                            />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 ease-in-out"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <form className="my-6 flex flex-col gap-1 border-b border-neutral-300 pb-6 mb-6">
                    <label>Collection Name</label>
                    <div className="flex flex-row items-center justify-between">
                        <input
                            type="text"
                            className="rounded-xl border border-neutral-300 w-[80%] px-3 py-1"
                            value={collectionName}
                            placeholder="Enter Category Name"
                            onChange={(e) => setCollectionName(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={!collectionName}
                            className="bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </form>

                <div className=" mb-6 pb-6  border-neutral-300 flex flex-row justify-between items-center">
                    <select value={deleteCategory} onChange={handleDeleteCategoryChange} className="border border-neutral-300 px-3 py-1 w-fit rounded-lg">
                        <option value="">Select a category</option>
                        {category.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm disabled:bg-red-300 disabled:cursor-not-allowed hover:bg-red-600 transition duration-300 ease-in-out ml-2"
                            onClick={handleDelete}
                            disabled={!deleteCategory}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            {`   `} Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
