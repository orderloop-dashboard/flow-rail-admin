import React, { useState, useEffect } from "react";
import {
    getAluminiumTypes,
    createAluminiumType,
    updateAluminiumType,
    deleteAluminiumType,
    getSteelTypes,
    createSteelType,
    updateSteelType,
    deleteSteelType,
} from "../services/apiService";

const TypeManager = ({ type }) => {
    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState("");
    const [editType, setEditType] = useState({});

    useEffect(() => {
        const fetchTypes = async () => {
            let data;
            if (type === "aluminium") {
                data = await getAluminiumTypes();
            } else {
                data = await getSteelTypes();
            }
            setTypes(data);
        };

        fetchTypes();
    }, [type]);

    const handleAddType = async () => {
        if (newType) {
            let createdType;
            if (type === "aluminium") {
                createdType = await createAluminiumType({ name: newType });
            } else {
                createdType = await createSteelType({ name: newType });
            }
            setTypes([...types, createdType]);
            setNewType("");
        }
    };

    const handleEditChange = (id, value) => {
        setEditType((prev) => ({ ...prev, [id]: value }));
    };

    const handleEditType = async (id) => {
        if (editType[id]) {
            let updatedType;
            if (type === "aluminium") {
                updatedType = await updateAluminiumType(id, { name: editType[id] });
            } else {
                updatedType = await updateSteelType(id, { name: editType[id] });
            }
            setTypes(types.map((t) => (t._id === id ? updatedType : t)));
            setEditType((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const handleDeleteType = async (id) => {
        if (type === "aluminium") {
            await deleteAluminiumType(id);
        } else {
            await deleteSteelType(id);
        }
        setTypes(types.filter((t) => t._id !== id));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{type.charAt(0).toUpperCase() + type.slice(1)} Type Manager</h1>
            <div className="mb-4">
                <input type="text" value={newType} onChange={(e) => setNewType(e.target.value)} placeholder={`New ${type} type name`} className="border p-2 mr-2" />
                <button onClick={handleAddType} className="bg-blue-500 text-white p-2 rounded">
                    Add Type
                </button>
            </div>
            <ul>
                {types.map((t) => (
                    <li key={t._id} className="flex items-center mb-2">
                        <input type="text" value={editType[t._id] || t.name} onChange={(e) => handleEditChange(t._id, e.target.value)} className="border p-2 mr-2" />
                        <button onClick={() => handleEditType(t._id)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteType(t._id)} className="bg-red-500 text-white p-2 rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TypeManager;
