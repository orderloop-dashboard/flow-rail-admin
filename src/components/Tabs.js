import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

const Tabs = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex space-x-4 border-b border-gray-300">
                {React.Children.map(children, (child, index) => (
                    <Tab key={index} className={({ selected }) => classNames("py-2 px-4 cursor-pointer", selected ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600")}>
                        {child.props.label}
                    </Tab>
                ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
                {React.Children.map(children, (child, index) => (
                    <Tab.Panel key={index} className="p-4">
                        {child.props.children}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs;
