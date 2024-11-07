import { useEffect, useState } from 'react';

const Cotizaciones = () => {
    const [cotizaciones, setCotizaciones] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.argentinadatos.com/v1/cotizaciones/dolares')
            .then(response => response.json())
            .then(data => {
                // Ordena los datos por fecha en orden descendente
                const sortedData = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                // Toma la primera cotización (la más reciente)
                setCotizaciones(sortedData.slice(0, 1));
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>Error al recuperar los datos: {error.message}</div>;
    }

    return (
        <div className="ContainerApi">
            {cotizaciones.length > 0 &&
                cotizaciones.map((cotizacion, index) => (
                    <div key={index} className='DivApi'>
                        <h3>Casa: {cotizacion.casa}</h3>
                        <div className='ApiCont'>
                            <p>Compra: {cotizacion.compra} ARS</p>
                            <p>Venta: {cotizacion.venta} ARS</p>
                            <p>Fecha: {cotizacion.fecha}</p>
                        </div>
                        
                    </div>
                ))}
        </div>
    );
};

export default Cotizaciones;
