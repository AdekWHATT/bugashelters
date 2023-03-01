import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import bombShelters from '../../shelters';


const Shelter = () => {
    const [userCoords, setUserCoords] = useState(null);
    const [shelterCoords, setShelterCoords] = useState(null);

    useEffect(() => {
        // Получение геолокации пользователя
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserCoords([latitude, longitude]);
            },
            error => {
                console.error(error);
                alert("Для получения всех точек, Вам нужно включить геолокацию и перезагрузить приложение")
                // нужно проработать возможность проверки ошибки и вывода повторного разрешения к геолокации
            }
        );
    }, []);

    console.log(userCoords);

    const handleYMapsLoad = (ymaps) => {
        // Используйте API Яндекса, чтобы найти ближайшее бомбоубежище
        const userPoint = userCoords ? ymaps.util.bounds.getCenterAndZoom([userCoords]) : null;
        const closestShelter = ymaps.geoQuery(bombShelters.map(shelter => shelter.coordinates))
            .setFilter('type != "Point"')
            .setReferencePoint(userPoint)
            .setSortByDistance(userPoint)
            .get(0);
        setShelterCoords(closestShelter.geometry.getCoordinates());
    };

    const defaultState = {
        center: userCoords || [55.755814, 37.617635],
        zoom: 14,
    };

    return (
        <YMaps onLoad={(ymaps) => handleYMapsLoad(ymaps)}>
            <Map width='100%' height='500px' defaultState={defaultState}>
                {userCoords && (
                    <Placemark
                        geometry={userCoords}
                        options={{ preset: 'islands#blueDotIconWithCaption' }}
                        properties={{ balloonContent: 'You are here' }}
                    />
                )}
                {shelterCoords && (
                    <Placemark
                        geometry={shelterCoords}
                        options={{ preset: 'islands#blueDotIconWithCaption' }}
                        properties={{ balloonContent: 'Nearest shelter: ' + bombShelters.find(shelter => shelter.coordinates === shelterCoords).name }}
                    />
                )}
                {bombShelters.map((shelter, index) => (
                    <Placemark
                        key={index}
                        geometry={shelter.coordinates}
                        options={shelter.options}
                        properties={{ balloonContent: shelter.name }}
                    />
                ))}

            </Map>
        </YMaps>
    );
};

export default Shelter;
