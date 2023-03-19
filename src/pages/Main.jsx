import React, { useState } from 'react';
import Shelter from '../components/Shelter/Shelter';
import News from '../components/News/News';
import Dashboard from '../components/Dashboard/Dashboard';
import MainInfo from '../components/Dashboard/MainInfo/MainInfo';
const Main = () => {
    const [selectedComponents, setSelectedComponents] = useState([]);
    const handleComponentSelection = (selectedComponent) => {
        setSelectedComponents((prevSelectedComponents) => {
            // Check if the component is already selected
            const isAlreadySelected = prevSelectedComponents.includes(selectedComponent);
            if (isAlreadySelected) {
                // If it is, remove it from the selected components
                return prevSelectedComponents.filter((component) => component !== selectedComponent);
            } else {
                // Otherwise, add it to the selected components
                return [...prevSelectedComponents, selectedComponent];
            }
        });
    };
    return (

        <>
            <div className='col-2'>
                <Dashboard onComponentSelection={handleComponentSelection} />
            </div>
            <div className='col-10'>
                {selectedComponents.length === 0 && <MainInfo />}
                {selectedComponents.includes('News') && <News />}
                {selectedComponents.includes('Shelter') && <Shelter />}
            </div>
        </>
    )
}

export default Main;