// ProductPopup.js
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { getAluminiumTypes, getSteelTypes } from "../../services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductPopup = ({ onClose, category }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://florail-backend.vercel.app/api/products", { ...data, category });
            console.log(response.data);
            onClose(); // Close the popup on successful submission
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            let data;
            if (category === "aluminium") {
                data = await getAluminiumTypes();
            } else {
                data = await getSteelTypes();
            }
            setTypes(data);
        };

        fetchTypes();
    }, [category]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Add Product Details</h2>
                    <button onClick={() => onClose(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Name is required" }}
                            render={({ field }) => <input {...field} className="border rounded p-2 w-full" type="text" />}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Type</label>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Type is required" }}
                            render={({ field }) => <input {...field} className="border rounded p-2 w-full" type="text" />}
                        />
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div> */}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <Controller
                            name="desc"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <textarea {...field} className="border rounded p-2 w-full" rows="3" />}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Type</label>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Category is required" }}
                            render={({ field }) => (
                                <select {...field} className="border rounded p-2 w-full">
                                    <option value="">Select type</option>

                                    {types?.map((el, index) => (
                                        <option value={el.name} key={index}>
                                            {el.name}
                                        </option>
                                    ))}
                                    {/* <option value="aluminum">Aluminum</option>
                                    <option value="steel">Steel</option> */}
                                </select>
                            )}
                        />
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        {/* <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                            Cancel
                        </button> */}
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductPopup;
