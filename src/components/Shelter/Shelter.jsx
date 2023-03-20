import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';
import bombShelters from '../../shelters';

const Shelter = () => {
    const [userCoords, setUserCoords] = useState(null);
    const [shelterCoords, setShelterCoords] = useState(null);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [ymaps, setYMaps] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserCoords([latitude, longitude]);
            },
            error => {
                console.error(error);
                alert("Для получения всех точек, Вам нужно включить геолокацию и перезагрузить приложение")
            }
        );
    }, []);

    const handleYMapsLoad = ymaps => {
        const userPoint = userCoords ? ymaps.util.bounds.getCenterAndZoom([userCoords]) : null;
        const closestShelter = ymaps.geoQuery(bombShelters.map(shelter => shelter.coordinates))
            .setFilter('type != "Point"')
            .setReferencePoint(userPoint)
            .setSortByDistance(userPoint)
            .get(0);
        setShelterCoords(closestShelter.geometry.getCoordinates());
    };

    const handleRoute = (mapRef) => {
        if (userCoords && shelterCoords && ymaps) {
            const map = mapRef.current;
            ymaps.route([userCoords, shelterCoords], {
                mapStateAutoApply: true,
                routingMode: 'pedestrian',
                avoidTrafficJams: true,
                wayPointVisible: false,
            }).then((route) => {
                map.geoObjects.add(route);
                route.getPaths().options.set({
                    strokeColor: '0000ffff',
                    opacity: 0.9
                });
            });
        }
    };

    const handleMarkerClick = (coords) => {
        setShelterCoords(coords);
    };

    const mapRef = useRef(null);
    const defaultState = {
        center: userCoords || [55.755814, 37.617635],
        zoom: 14,
    };

    return (
        <div className='row p-4 rounded-4'>
            <YMaps
                query={{
                    apikey: '45c08cb2-2a71-414c-8791-6734b57701ae',
                    load: 'util.geoQuery,coordSystem.geo,coordSystem.cartesian,map',
                }}
                onLoad={(ymaps) => setYMaps(ymaps)}
            >
                <Map
                    width='1100px'
                    height='500px'
                    defaultState={defaultState}
                    instanceRef={ref => {
                        if (ref) {
                            ref.behaviors.disable('scrollZoom');
                        }
                    }}
                    onLoad={handleYMapsLoad}
                    onClick={() => setShelterCoords(null)}
                    
                >
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
                            properties={{
                                balloonContent:
                                    'Nearest shelter: ' +
                                    bombShelters.find(shelter => shelter.coordinates === shelterCoords).name,
                                iconCaption: 'Route to shelter',
                            }}
                            onClick={() => handleRoute(mapRef, ymaps)}
                        />

                    )}
                    {bombShelters.map((shelter, index) => (
                        <Placemark
                            key={index}
                            geometry={shelter.coordinates}
                            options={shelter.options}
                            properties={{ balloonContent: shelter.name }}
                            onClick={() => setShelterCoords(shelter.coordinates)}
                        />
                    ))}
                    {userCoords && shelterCoords && (
                        <Polyline
                            geometry={[userCoords, shelterCoords]}
                            options={{ strokeColor: '#0000ff', strokeWidth: 4 }}
                        />
                    )}
                </Map>
            </YMaps>
        </div>
    );
};
export default Shelter;