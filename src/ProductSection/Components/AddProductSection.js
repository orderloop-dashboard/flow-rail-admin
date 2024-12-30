import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddProductSection(props) {
    const { setShowUploadPopup } = props;

    return (
        <>
            <div className="flex justify-end w-full gap-4">
                <button className="bg-blue-500 rounded-md px-4 py-2 text-white font-bold " onClick={() => setShowUploadPopup("aluminium")}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Aluminium Product
                </button>
                <button className="bg-blue-500 rounded-md px-4 py-2 text-white font-bold " onClick={() => setShowUploadPopup("steel")}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Steel Product
                </button>
            </div>
        </>
    );
}
