// // import React, { useEffect, useState } from "react";
// // import ProductTable from "./Components/ProductTable";
// // import AddProductSection from "./Components/AddProductSection";
// // import AddProductPopup from "./Components/AddProductPopup";
// // import axios from "axios";
// // import AddCategory from "./Components/AddCategory";

// // export default function ProductSection() {
// //     const [showUploadPopup, setShowUploadPopup] = useState(false);

// //     const [products, setProducts] = useState([]);

// //     const [category, setCategory] = useState([]);

// //     const [showCategoryPopup, setShowCategoryPopup] = useState(false);

// //     const fetchAllProduct = async () => {
// //         try {
// //             const response = await axios.get("http://localhost:5000/api/product/get-product");
// //             console.log("response ==>", response);
// //             setCategory(response.data.map((el) => el.category));
// //             setProducts(response.data);
// //         } catch (error) {
// //             console.log("error ==>", error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchAllProduct();
// //     }, []);

// //     const [rowDataToEdit, setRowDataToEdit] = useState(null);

// //     const [setshowROwData, setSetshowROwData] = useState(null);

// //     return (
// //         <>
// //             <div className="container mx-auto px-36 py-10">
// //                 <AddProductSection setShowCategoryPopup={setShowCategoryPopup} setShowUploadPopup={setShowUploadPopup} />

//                 {products.map((el, index) => {
//                     return (
//                         <div key={index} className="border-b border-neutral-300 pb-6 mb-6">
//                             <h1 className="text-lg font-bold">{el.category}</h1>
//                             <ProductTable
//                                 setSetshowROwData={setSetshowROwData}
//                                 setRowDataToEdit={setRowDataToEdit}
//                                 fetchAllProduct={fetchAllProduct}
//                                 products={el.data}
//                                 category={el.category}
//                             />
//                         </div>
//                     );
//                 })}
//             </div>

// //             {showUploadPopup && <AddProductPopup category={category} fetchAllProduct={fetchAllProduct} setShowUploadPopup={setShowUploadPopup} />}

// //             {setshowROwData && (
// //                 <AddProductPopup isReadOnly rowDataToEdit={setshowROwData} category={category} fetchAllProduct={fetchAllProduct} setShowUploadPopup={setShowUploadPopup} />
// //             )}

// //             {rowDataToEdit && (
// //                 <AddProductPopup rowDataToEdit={rowDataToEdit} fetchAllProduct={fetchAllProduct} category={category} setShowUploadPopup={() => setRowDataToEdit(null)} />
// //             )}

// //             {showCategoryPopup && (
// //                 <AddCategory showCategoryPopup={showCategoryPopup} category={category} setShowCategoryPopup={setShowCategoryPopup} fetchAllProduct={fetchAllProduct} />
// //             )}
// //         </>
// //     );
// // }

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const App = () => {
// //     const [types, setTypes] = useState([]);
// //     const [category, setCategory] = useState("aluminium"); // Default category
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [typeData, setTypeData] = useState({ name: "" });
// //     const [selectedTypeId, setSelectedTypeId] = useState(null);

// //     useEffect(() => {
// //         fetchTypes();
// //     }, [category]);

// //     const fetchTypes = () => {
// //         axios
// //             .get(`http://localhost:5000/api/${category}/type`)
// //             .then((response) => {
// //                 setTypes(response.data);
// //             })
// //             .catch((error) => {
// //                 console.error("There was an error fetching the types!", error);
// //             });
// //     };

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setTypeData({
// //             ...typeData,
// //             [name]: value,
// //         });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (selectedTypeId) {
// //             axios
// //                 .put(`http://localhost:5000/api/${category}/type/${selectedTypeId}`, typeData)
// //                 .then(() => {
// //                     fetchTypes();
// //                     closeModal();
// //                 })
// //                 .catch((error) => {
// //                     console.error("There was an error updating the type!", error);
// //                 });
// //         } else {
// //             axios
// //                 .post(`http://localhost:5000/api/${category}/type`, typeData)
// //                 .then(() => {
// //                     fetchTypes();
// //                     closeModal();
// //                 })
// //                 .catch((error) => {
// //                     console.error("There was an error creating the type!", error);
// //                 });
// //         }
// //     };

// //     const openModal = (typeId = null) => {
// //         setSelectedTypeId(typeId);
// //         if (typeId) {
// //             const type = types.find((t) => t._id === typeId);
// //             setTypeData(type);
// //         } else {
// //             setTypeData({ name: "" });
// //         }
// //         setIsModalOpen(true);
// //     };

// //     const closeModal = () => {
// //         setIsModalOpen(false);
// //         setSelectedTypeId(null);
// //     };

// //     return (
// //         <div className="p-4">
// //             <h1 className="text-2xl font-bold">Types Management</h1>
// //             <select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-4 p-2 border">
// //                 <option value="aluminium">Aluminium</option>
// //                 <option value="steel">Steel</option>
// //             </select>
// //             <button onClick={() => openModal()} className="bg-blue-500 text-white p-2 rounded mb-4">
// //                 Add Type
// //             </button>
// //             <table className="min-w-full bg-white">
// //                 <thead>
// //                     <tr>
// //                         <th className="py-2 px-4 border-b">Name</th>
// //                         <th className="py-2 px-4 border-b">Actions</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {types.map((type) => (
// //                         <tr key={type._id}>
// //                             <td className="py-2 px-4 border-b">{type.name}</td>
// //                             <td className="py-2 px-4 border-b">
// //                                 <button onClick={() => openModal(type._id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
// //                                     Edit
// //                                 </button>
// //                                 <button
// //                                     onClick={() => {
// //                                         axios
// //                                             .delete(`http://localhost:5000/api/${category}/type/${type._id}`)
// //                                             .then(() => {
// //                                                 fetchTypes();
// //                                             })
// //                                             .catch((error) => {
// //                                                 console.error("There was an error deleting the type!", error);
// //                                             });
// //                                     }}
// //                                     className="bg-red-500 text-white p-1 rounded"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>

// //             {isModalOpen && (
// //                 <div className="fixed inset-0 flex items-center justify-center z-50">
// //                     <div className="bg-black opacity-50 absolute inset-0"></div>
// //                     <div className="bg-white rounded p-4 relative z-10 w-1/3">
// //                         <h2 className="text-xl mb-4">{selectedTypeId ? "Edit Type" : "Add Type"}</h2>
// //                         <form onSubmit={handleSubmit}>
// //                             <label className="block mb-2">
// //                                 Name:
// //                                 <input type="text" name="name" value={typeData.name} onChange={handleInputChange} className="border p-2 w-full" />
// //                             </label>
// //                             <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
// //                                 {selectedTypeId ? "Update" : "Create"}
// //                             </button>
// //                             <button type="button" onClick={closeModal} className="bg-gray-500 text-white p-2 rounded">
// //                                 Cancel
// //                             </button>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductModal from "./Components/ProductModel";

// const App = () => {
//     const [types, setTypes] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [category, setCategory] = useState("aluminium"); // Default category
//     const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
//     const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//     const [typeData, setTypeData] = useState({ name: "" });
//     const [selectedTypeId, setSelectedTypeId] = useState(null);
//     const [selectedProductId, setSelectedProductId] = useState(null);

//     useEffect(() => {
//         fetchTypes();
//         fetchProducts();
//     }, [category]);

//     const fetchTypes = () => {
//         axios
//             .get(`http://localhost:5000/api/${category}/type`)
//             .then((response) => {
//                 setTypes(response.data);
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the types!", error);
//             });
//     };

//     const fetchProducts = () => {
//         axios
//             .get(`http://localhost:5000/api/${category}/product`)
//             .then((response) => {
//                 setProducts(response.data);
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the products!", error);
//             });
//     };

//     const handleTypeInputChange = (e) => {
//         const { name, value } = e.target;
//         setTypeData({
//             ...typeData,
//             [name]: value,
//         });
//     };

//     const handleTypeSubmit = (e) => {
//         e.preventDefault();
//         if (selectedTypeId) {
//             axios
//                 .put(`http://localhost:5000/api/${category}/type/${selectedTypeId}`, typeData)
//                 .then(() => {
//                     fetchTypes();
//                     closeTypeModal();
//                 })
//                 .catch((error) => {
//                     console.error("There was an error updating the type!", error);
//                 });
//         } else {
//             axios
//                 .post(`http://localhost:5000/api/${category}/type`, typeData)
//                 .then(() => {
//                     fetchTypes();
//                     closeTypeModal();
//                 })
//                 .catch((error) => {
//                     console.error("There was an error creating the type!", error);
//                 });
//         }
//     };

//     const openTypeModal = (typeId = null) => {
//         setSelectedTypeId(typeId);
//         if (typeId) {
//             const type = types.find((t) => t._id === typeId);
//             setTypeData(type);
//         } else {
//             setTypeData({ name: "" });
//         }
//         setIsTypeModalOpen(true);
//     };

//     const closeTypeModal = () => {
//         setIsTypeModalOpen(false);
//         setSelectedTypeId(null);
//     };

//     const openProductModal = (productId = null) => {
//         setSelectedProductId(productId);
//         setIsProductModalOpen(true);
//     };

//     const closeProductModal = () => {
//         setIsProductModalOpen(false);
//         setSelectedProductId(null);
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold">Management</h1>
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="mb-4 p-2 border">
//                 <option value="aluminium">Aluminium</option>
//                 <option value="steel">Steel</option>
//             </select>
//             <div className="mb-4">
//                 <button onClick={() => openTypeModal()} className="bg-blue-500 text-white p-2 rounded mb-4">
//                     Add Type
//                 </button>
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b">Name</th>
//                             <th className="py-2 px-4 border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {types.map((type) => (
//                             <tr key={type._id}>
//                                 <td className="py-2 px-4 border-b">{type.name}</td>
//                                 <td className="py-2 px-4 border-b">
//                                     <button onClick={() => openTypeModal(type._id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             axios
//                                                 .delete(`http://localhost:5000/api/${category}/type/${type._id}`)
//                                                 .then(() => {
//                                                     fetchTypes();
//                                                 })
//                                                 .catch((error) => {
//                                                     console.error("There was an error deleting the type!", error);
//                                                 });
//                                         }}
//                                         className="bg-red-500 text-white p-1 rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div>
//                 <button onClick={() => openProductModal()} className="bg-green-500 text-white p-2 rounded mb-4">
//                     Add Product
//                 </button>
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b">Name</th>
//                             <th className="py-2 px-4 border-b">Description</th>
//                             <th className="py-2 px-4 border-b">Type</th>
//                             <th className="py-2 px-4 border-b">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product) => (
//                             <tr key={product._id}>
//                                 <td className="py-2 px-4 border-b">{product.name}</td>
//                                 <td className="py-2 px-4 border-b">{product.description}</td>
//                                 <td className="py-2 px-4 border-b">{product.type.name}</td>
//                                 <td className="py-2 px-4 border-b">
//                                     <button onClick={() => openProductModal(product._id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
//                                         Edit
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             axios
//                                                 .delete(`http://localhost:5000/api/${category}/product/${product._id}`)
//                                                 .then(() => {
//                                                     fetchProducts();
//                                                 })
//                                                 .catch((error) => {
//                                                     console.error("There was an error deleting the product!", error);
//                                                 });
//                                         }}
//                                         className="bg-red-500 text-white p-1 rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {isTypeModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="bg-black opacity-50 absolute inset-0"></div>
//                     <div className="bg-white rounded p-4 relative z-10 w-1/3">
//                         <h2 className="text-xl mb-4">{selectedTypeId ? "Edit Type" : "Add Type"}</h2>
//                         <form onSubmit={handleTypeSubmit}>
//                             <label className="block mb-2">
//                                 Name:
//                                 <input type="text" name="name" value={typeData.name} onChange={handleTypeInputChange} className="border p-2 w-full" />
//                             </label>
//                             <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
//                                 {selectedTypeId ? "Update" : "Create"}
//                             </button>
//                             <button type="button" onClick={closeTypeModal} className="bg-gray-500 text-white p-2 rounded">
//                                 Cancel
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {isProductModalOpen && (
//                 <ProductModal isOpen={isProductModalOpen} onRequestClose={closeProductModal} category={category} productId={selectedProductId} refreshProducts={fetchProducts} />
//             )}
//         </div>
//     );
// };

// export default App;

import React, { useEffect, useState } from "react";
import TypeManager from "../components/TypeManager";
import ProductTable from "./Components/ProductTable";
import AddProductSection from "./Components/AddProductSection";
import ProductModal from "./Components/ProductModel";
import axios from "axios";
import AddProductPopup from "./Components/AddProductPopup";
import { getAluminiumTypes, getSteelTypes } from "../services/apiService";

export default function ProductSection() {
    const [ShowUploadPopup, setShowUploadPopup] = useState(null);

    const [aluminumPro, setAluminumPro] = useState([]);

    console.log("aluminumPro ==>", aluminumPro);

    const [steelPro, setSteelPro] = useState([]);

    const getAllProduct = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setAluminumPro(response.data.aluminiumProducts);
            setSteelPro(response.data.steelProducts);
        } catch (error) {
            console.log("error ==>", error);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    const [types, setTypes] = useState({ aluminium: [], steel: [] });

    useEffect(() => {
        const fetchTypes = async () => {
            const aluminium = await getAluminiumTypes();
            const steel = await getSteelTypes();
            setTypes({ steel, aluminium });
        };

        fetchTypes();
    }, []);

    const [rowDataToEdit, setRowDataToEdit] = useState(null);

    return (
        <div>
            <TypeManager type="aluminium" />
            <TypeManager type="steel" />
            <AddProductSection setShowUploadPopup={setShowUploadPopup} />

            <h1>Aluminium Section</h1>
            <ProductTable
                category="aluminium"
                fetchAllProduct={getAllProduct}
                data={aluminumPro}
                setRowDataToEdit={(data, isReadOnly) => setRowDataToEdit({ data, type: "aluminium", isReadOnly })}
            />

            <h1>Steel Section</h1>
            <ProductTable
                category="steel"
                fetchAllProduct={getAllProduct}
                data={steelPro}
                setRowDataToEdit={(data, isReadOnly) => setRowDataToEdit({ data, type: "steel", isReadOnly })}
            />

            {ShowUploadPopup === "aluminium" && (
                <AddProductPopup
                    fetchAllProduct={() => {
                        getAllProduct();
                    }}
                    category={types.aluminium}
                    ShowUploadPopup={ShowUploadPopup}
                    setShowUploadPopup={setShowUploadPopup}
                />
            )}

            {ShowUploadPopup === "steel" && (
                <AddProductPopup
                    fetchAllProduct={() => {
                        getAllProduct();
                    }}
                    category={types.steel}
                    ShowUploadPopup={ShowUploadPopup}
                    setShowUploadPopup={setShowUploadPopup}
                />
            )}

            {rowDataToEdit?.type === "aluminium" &&
                (rowDataToEdit?.isReadOnly ? (
                    <AddProductPopup
                        isReadOnly={true}
                        fetchAllProduct={() => {
                            getAllProduct();
                        }}
                        category={types.aluminium}
                        ShowUploadPopup={"aluminium"}
                        setShowUploadPopup={setRowDataToEdit}
                        rowDataToEdit={rowDataToEdit.data}
                    />
                ) : (
                    <AddProductPopup
                        fetchAllProduct={() => {
                            getAllProduct();
                        }}
                        category={types.aluminium}
                        ShowUploadPopup={"aluminium"}
                        setShowUploadPopup={setRowDataToEdit}
                        rowDataToEdit={rowDataToEdit.data}
                    />
                ))}

            {rowDataToEdit?.type === "steel" &&
                (rowDataToEdit?.isReadOnly ? (
                    <AddProductPopup
                        isReadOnly={true}
                        fetchAllProduct={() => {
                            getAllProduct();
                        }}
                        category={types.steel}
                        ShowUploadPopup={"steel"}
                        setShowUploadPopup={setRowDataToEdit}
                        rowDataToEdit={rowDataToEdit.data}
                    />
                ) : (
                    <AddProductPopup
                        fetchAllProduct={() => {
                            getAllProduct();
                        }}
                        category={types.steel}
                        ShowUploadPopup={"steel"}
                        setShowUploadPopup={setRowDataToEdit}
                        rowDataToEdit={rowDataToEdit.data}
                    />
                ))}
        </div>
    );
}
