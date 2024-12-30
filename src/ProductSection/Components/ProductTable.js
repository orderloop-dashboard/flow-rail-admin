// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// const ProductTable = ({ products, category, setRowDataToEdit, fetchAllProduct, setSetshowROwData }) => {
//     const handleClickDelete = async (_id) => {
//         try {
//             const response = await axios.delete("https://florail-backend.vercel.app/api/product/delete-product", { data: { category, _id } });
//             console.log("response ==>", response);

//             if (response.status === 200) {
//                 fetchAllProduct();
//             }
//         } catch (error) {
//             console.log("error ==>", error);
//         }
//     };

//     return (
//         <div className="py-10">
//             <div className="overflow-x-auto shadow-lg rounded-lg border border-neutral-300">
//                 <table className="min-w-full bg-white">
//                     <thead>
//                         <tr>
//                             <th className="w-28 text-left py-3 px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Sr. No.</th>
//                             <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Product Image</th>
//                             <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Product Name</th>
//                             <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Details</th>
//                             <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product, index) => (
//                             <tr key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
//                                 <td className="w-16 py-3 px-4 border-b border-gray-200 text-gray-700">{index + 1}.</td>
//                                 <td className="py-3 px-4 border-b border-gray-200">
//                                     <img src={product?.cloudinery_response?.[0]?.secure_url} alt={product.name} className="w-12 h-12 rounded-full" />
//                                 </td>
//                                 <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{product.name}</td>
//                                 <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
//                                     <button
//                                         className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
//                                         onClick={() => setSetshowROwData({ product, category })}
//                                     >
//                                         <FontAwesomeIcon icon={faInfoCircle} /> View Details
//                                     </button>
//                                 </td>
//                                 <td className="py-3 px-4 border-b border-gray-200">
//                                     <button
//                                         className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out mr-2"
//                                         onClick={() => setRowDataToEdit({ product, category })}
//                                     >
//                                         <FontAwesomeIcon icon={faEdit} /> Edit
//                                     </button>
//                                     <button className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-4" onClick={() => handleClickDelete(product._id)}>
//                                         <FontAwesomeIcon icon={faTrash} /> Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ProductTable;

import { faEdit, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";

export default function ProductTable({ data, setRowDataToEdit, category, fetchAllProduct }) {
    const handleClickDelete = async (id) => {
        try {
            const response = await axios.delete("https://florail-backend.vercel.app/api/products", { data: { category, id } });
            console.log("response ==>", response);

            if (response.status === 200) {
                fetchAllProduct();
            }
        } catch (error) {
            console.log("error ==>", error);
        }
    };

    return (
        <>
            <div className="py-10">
                <div className="overflow-x-auto shadow-lg rounded-lg border border-neutral-300">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="w-28 text-left py-3 px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Sr. No.</th>
                                <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Product Image</th>
                                <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Product Name</th>
                                <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Details</th>
                                <th className="py-3 text-left px-4 bg-gray-100 border-b border-gray-200 text-gray-600 uppercase font-bold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                                    <td className="w-16 py-3 px-4 border-b border-gray-200 text-gray-700">{index + 1}.</td>
                                    <td className="py-3 px-4 border-b border-gray-200">
                                        <img src={product?.cloudinery_response?.[0]?.secure_url} alt={product.name} className="w-12 h-12 rounded-full" />
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">{product.name}</td>
                                    <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                                        <button
                                            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                                            onClick={() => setRowDataToEdit(product, true)}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} /> View Details
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-200">
                                        <button
                                            className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out mr-2"
                                            onClick={() => setRowDataToEdit(product)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-4"
                                            onClick={() => handleClickDelete(product._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
