import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DoubleInput, SingleInput } from "./inputs";
import axios from "axios";

export default function AddProductPopup({ setShowUploadPopup, category, rowDataToEdit, fetchAllProduct, isReadOnly, ShowUploadPopup }) {
    const {
        control,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            sections: rowDataToEdit?.sections ?? [{ sectionHeading: "", detailsType: "single", details: [] }],
            category: rowDataToEdit?.type ?? "",
            name: rowDataToEdit?.name ?? "",
            showcaseImages: rowDataToEdit?.cloudinery_response?.map((el) => ({ url: el.secure_url, secure_url: el.secure_url, type: "cloudinery" })) ?? [],
        },
    });

    console.log("errors ==>", errors);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sections",
    });

    // console.log("watch ==>", watch("showcaseImages"));

    const uploadProduct = async (data) => {
        const formData = new FormData();

        formData.append("sections", JSON.stringify(data.sections));

        console.log("data.category. ==>", data.category);

        formData.append("type", data.category);
        formData.append("name", data.name);
        formData.append("category", ShowUploadPopup);

        for (let i = 0; i < data?.showcaseImages?.length; i++) {
            formData.append("files", data.showcaseImages[i]);
        }

        const response = await axios.post("http://localhost:5000/api/products", formData);

        if (response.status === 200) {
            setShowUploadPopup(false);
            fetchAllProduct();
        }
    };

    const editProduct = async (data) => {
        const formData = new FormData();

        formData.append("sections", JSON.stringify(data.sections));

        formData.append("type", data.category);
        formData.append("category", ShowUploadPopup);
        formData.append("name", data.name);

        for (let i = 0; i < data?.showcaseImages?.length; i++) {
            if (data.showcaseImages[i].type === "cloudinery") {
                break;
            }

            formData.append("files", data.showcaseImages[i]);
        }

        console.log("objectx");

        formData.append("_id", rowDataToEdit._id);

        formData.append("cloudinery_image", JSON.stringify(selectedImages.filter((el) => el.type === "cloudinery")));

        const response = await axios.put(`http://localhost:5000/api/products`, formData);

        if (response.status === 200) {
            setShowUploadPopup(false);
            fetchAllProduct();
        }
    };

    const handleFormSubmit = (data) => {
        console.log("object");

        !!rowDataToEdit ? editProduct(data) : uploadProduct(data);
    };

    const addInputField = (index, type) => {
        const currentDetails = getValues(`sections[${index}].details`) || [];
        if (type === "single") {
            currentDetails.push({ value: "" });
        } else {
            currentDetails.push({ title: "", desc: "" });
        }
        setValue(`sections[${index}].details`, currentDetails);
    };

    const [selectedImages, setSelectedImages] = React.useState([]);

    useEffect(() => {
        setValue("showcaseImages", rowDataToEdit?.cloudinery_response?.map((el) => ({ url: el.secure_url, type: "cloudinery", secure_url: el.secure_url })) ?? []);
        setSelectedImages(rowDataToEdit?.cloudinery_response?.map((el) => ({ url: el.secure_url, type: "cloudinery", secure_url: el.secure_url })) ?? []);
    }, [rowDataToEdit]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    };

    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/2 h-[80vh] overflow-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Add Product Details</h2>
                    <button onClick={() => setShowUploadPopup(false)}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
                    {!isReadOnly && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Select Images</label>
                            <Controller
                                name="showcaseImages"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            onChange(e.target.files);
                                            handleImageChange(e);
                                        }}
                                        className="mt-1 block w-full"
                                    />
                                )}
                            />
                        </div>
                    )}
                    <div className="mt-4">
                        {selectedImages.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-lg font-semibold mb-2">Selected Images</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={image.url} alt={`Selected Image ${index}`} className="w-full h-32 object-cover rounded-lg" />
                                            {!isReadOnly && (
                                                <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Product Name</label>
                        <Controller
                            name={`name`}
                            control={control}
                            rules={{ required: "Please enter name" }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    disabled={isReadOnly}
                                    placeholder="Enter product name"
                                    {...field}
                                    className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1"
                                />
                            )}
                        />
                        {errors.name && <span className="text-sm text-red-500">* Please enter name</span>}
                    </div>

                    {/* <div className="text-blue-500 text-xs mb-4">*First one will be shown in main page</div> */}

                    <div className="my-4">
                        <label className="block text-gray-700">Category</label>
                        <Controller
                            name={`category`}
                            control={control}
                            rules={{ required: "Please enter category" }}
                            render={({ field }) => (
                                <select
                                    disabled={isReadOnly}
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1"
                                >
                                    <option value={""}> Select Category </option>

                                    {category.map((el, index) => {
                                        return (
                                            <option key={index} value={el.name}>
                                                {el.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                        />
                        {errors.category && <span className="text-sm text-red-500">* Please select category</span>}
                    </div>

                    {!isReadOnly && (
                        <div
                            className="flex gap-3 items-center mb-4 border-neutral-300 px-3 py-1 rounded-lg bg-blue-500 text-white w-fit cursor-pointer"
                            onClick={() => append({ sectionHeading: "", detailsType: "single", details: [] })}
                        >
                            <h3 className="text-lg font-semibold">Add New Section</h3>
                            <FontAwesomeIcon icon={faPlus} className="text-white hover:text-gray-700" />
                        </div>
                    )}
                    <div className="h-[50vh] overflow-auto">
                        {fields.map((item, index) => (
                            <div key={item.id} className="border border-neutral-300 rounded-xl shadow-lg bg-neutral-100 px-3 py-2 mb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Section {index + 1}</h3>
                                    {!isReadOnly && (
                                        <button type="button" onClick={() => remove(index)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-gray-500 hover:text-gray-700" />
                                        </button>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Heading</label>
                                    <Controller
                                        name={`sections[${index}].sectionHeading`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                disabled={isReadOnly}
                                                type="text"
                                                {...field}
                                                className="mt-1 block w-full border-neutral-300 border rounded-md shadow-sm px-2 py-1"
                                            />
                                        )}
                                    />
                                </div>

                                <section>
                                    <div className="mb-4">
                                        <Controller
                                            name={`sections[${index}].detailsType`}
                                            control={control}
                                            disabled={isReadOnly}
                                            render={({ field }) => (
                                                <div className="mt-1 block w-full">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            disabled={isReadOnly}
                                                            type="radio"
                                                            {...field}
                                                            value="single"
                                                            checked={field.value === "single"}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">Single </span>
                                                    </label>
                                                    <label className="inline-flex items-center ml-4">
                                                        <input
                                                            disabled={isReadOnly}
                                                            type="radio"
                                                            {...field}
                                                            value="double"
                                                            checked={field.value === "double"}
                                                            className="form-radio"
                                                        />
                                                        <span className="ml-2">Double </span>
                                                    </label>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    {watch(`sections[${index}].detailsType`) === "single" ? (
                                        <div>
                                            {watch(`sections[${index}].details`)?.map((detail, detailIndex) => (
                                                <SingleInput
                                                    isReadOnly={isReadOnly}
                                                    control={control}
                                                    key={detailIndex}
                                                    name={`sections[${index}].details[${detailIndex}].value`}
                                                />
                                            ))}
                                            {!isReadOnly && (
                                                <button type="button" onClick={() => addInputField(index, "single")} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4">
                                                    <FontAwesomeIcon icon={faPlus} className="text-white" /> Add detail
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            {watch(`sections[${index}].details`)?.map((detail, detailIndex) => (
                                                <DoubleInput
                                                    isReadOnly={isReadOnly}
                                                    control={control}
                                                    key={detailIndex}
                                                    name1={`sections[${index}].details[${detailIndex}].title`}
                                                    name2={`sections[${index}].details[${detailIndex}].desc`}
                                                />
                                            ))}

                                            {!isReadOnly && (
                                                <button type="button" onClick={() => addInputField(index, "double")} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-4">
                                                    <FontAwesomeIcon icon={faPlus} className="text-white" /> Add detail
                                                </button>
                                            )}
                                            {/* <button type="button" onClick={() => addInputField(index, "double")}>
                                                <FontAwesomeIcon icon={faPlus} className="text-white" />
                                            </button> */}
                                        </div>
                                    )}
                                </section>
                            </div>
                        ))}
                    </div>
                    {!isReadOnly && (
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 ease-in-out">
                                Submit
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
