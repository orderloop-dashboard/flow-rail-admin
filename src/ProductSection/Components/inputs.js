import React from "react";
import { Controller } from "react-hook-form";

export function SingleInput(props) {
    const { name, control, isReadOnly } = props;
    return (
        <>
            <div className="flex-1">
                <label className="block text-gray-700 h-[21px]">Details</label>
                <Controller
                    name={name}
                    // name={`sections[${index}].details`}
                    control={control}
                    render={({ field }) => (
                        <input disabled={isReadOnly} type="text" {...field} className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1" />
                    )}
                />
            </div>
        </>
    );
}

export const DoubleInput = (props) => {
    const { name1, name2, control, isReadOnly } = props;

    return (
        <div className="flex mb-4">
            <div className="flex-1">
                <label className="block text-gray-700 h-[21px]">Details</label>
                <Controller
                    name={name1}
                    control={control}
                    render={({ field }) => (
                        <input disabled={isReadOnly} type="text" {...field} className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1" />
                    )}
                />
            </div>
            <div className="ml-4 flex-1">
                <label className="block text-gray-700 h-[21px]"></label>

                <Controller
                    name={name2}
                    control={control}
                    render={({ field }) => (
                        <input disabled={isReadOnly} type="text" {...field} className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1" />
                    )}
                />
            </div>
        </div>
    );
};
