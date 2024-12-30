import React from "react";

const Table = ({ headers, data, actions }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                        {actions && <th className="px-6 py-3" />}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
                                <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {value}
                                </td>
                            ))}
                            {actions && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{actions(item)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
