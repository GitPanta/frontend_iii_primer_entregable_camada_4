
// El componente Item no tiene componentes hijos.
// ESTADO: Item debe tener un número para almacenar la cantidad de stock, la misma se la defina el padre a la hora de crearlo.
// MÉTODOS: Item debe manejar el click de su boton para restar la cantidad en stock de sí mismo y a su vez poder aumentar el estado de su "abuelo" App.
// PROPS: Item recibe todos los campos que muestra en pantalla: nombre, descripcion, stock y el métodos heredados para su uso.
// Maqueta de Item:
//    h3
//    p
//    h5 > span    (este span debe mostrar la cantidad si es mayor a 0 "agotado" si llega a 0)
//    button       (este boton debe permitir comprar, pero si la cantidad es menor a 0 debe estar deshabilitado y decir "Sin stock")

import React, { useRef } from "react";
import { useState,  useEffect} from "react";

export default function Item(props) {

  const [stock, setStock] = useState(props.stock);
  const isMounted = useRef(0);
  
  useEffect( () => {

    if(isMounted.current >= 2) {
      props.incrementarCompras(props.nombre);
    
    } else {
      isMounted.current++;
    }
  }, [stock]);

  const restarStock = () => {
    setStock((prevState) => {
      let nuevoStock = prevState - 1;
      if(nuevoStock >= 0) {
        return nuevoStock;
      }
      return prevState;
    });
  };

  const renderStock = () => {
    if(stock > 0) {
      return stock;
    }

    return <mark style={{backgroundColor: "yellow"}}>agotado</mark>
  };

  return (
    <div className='producto'>
      <h3>{props.nombre}</h3>
      <p>{props.descripcion}</p>
      <h5>
        <span style={{backgroundColor: "white", color: "black"}}>
          <strong>
            En stock: {renderStock()}
          </strong>
        </span>
      </h5>
      {
        stock > 0 ?
        <button type="button" onClick={restarStock}>COMPRAR</button>
        :
        <button type="button" disabled>SIN STOCK</button>
      }
    </div>
  )
}