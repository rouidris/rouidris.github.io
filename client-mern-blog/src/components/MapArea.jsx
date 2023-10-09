import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWlyb24tcm9uZG8iLCJhIjoiY2xodDA1MHlxMGNtMjNlczR1NzNvOG5mOSJ9.t2QGc2zdxSoM4dRG0RU_CA';

const DrawPolygonMap = () => {
    const mapContainerRef = useRef(null);
    const drawRef = useRef(null);
    const [allCoordinates, setallCoordinates] = useState({})


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [44.5501935, 32.468191],
            zoom: 12
        });

        drawRef.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });
        map.addControl(drawRef.current);

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });
        map.addControl(geocoder, 'top-left');

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        return () => {
            map.off('draw.create', updateArea);
            map.off('draw.delete', updateArea);
            map.off('draw.update', updateArea);
            drawRef.current = null;
            map.remove();
        };
    }, []);

    const updateArea = () => {
        const data = drawRef.current.getAll();
        const answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
            const area = turf.area(data);
            const rounded_area = Math.round(area * 100) / 100;
            const resultText = `Площадь: ${rounded_area} метров в квадрате`;
            console.log(resultText);

            // Обновляем содержимое элемента с идентификатором 'calculated-area'
            answer.textContent = resultText;
        } else {
            // Если нет выбранных объектов, очищаем содержимое элемента
            answer.textContent = '';
        }
    };



    return (
        <div>
            <div ref={mapContainerRef} style={{height: "600px", width: "2/3" }}></div>

            <div id="calculated-area" style={{ marginTop: '10px', backgroundColor: '#fff', color: 'black', padding: '10px' }}></div>
        </div>
    );
};

export default DrawPolygonMap;
