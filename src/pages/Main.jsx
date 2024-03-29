import React, { useState } from 'react';
import Shelter from '../components/Shelter/Shelter';
import News from '../components/News/News';
import Dashboard from '../components/Dashboard/Dashboard';
import MainInfo from '../components/MainInfo/MainInfo';
import VkPlayList from '../components/VK/VkPlayList';
import Weather from '../components/Weather/Weather';
import Todo from '../components/Todo/Todo';
const Main = () => {
    const [selectedComponents, setSelectedComponents] = useState([]);
    const handleComponentSelection = (selectedComponent) => {
        setSelectedComponents([selectedComponent]);
    };
    return (
        <>
            <div className='col-2'>
                <Dashboard onComponentSelection={handleComponentSelection} />
            </div>
            <div className='col-10'>
                {selectedComponents.length === 0 || selectedComponents.includes('MainInfo') && <MainInfo />}
                {selectedComponents.includes('News') && <News />}
                {selectedComponents.includes('Weather') && <Weather />}
                {selectedComponents.includes('Todo') && <Todo />}
                {selectedComponents.includes('Shelter') && <Shelter />}
                {selectedComponents.includes('Vk') && <VkPlayList />}
            </div>
            
        </>
    )
}

export default Main;