import React ,{ useState, useEffect, useContext } from 'react';


export const useWindowSize = () => {
  let [ size, setSize ] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    let handlerWindowResize = (event) => {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', handlerWindowResize);
    return () => window.removeEventListener('resize', handlerWindowResize)
  })
  return [size, setSize];
}



export const useMousePosition = (defaultPosition = [0, 0]) => {
  let [ position, setPosition ] = useState(defaultPosition);
  useEffect(() => {
    const handlerMouseMove = (event) => {
      setPosition([event.clientX, event.clientY])
    }
    window.addEventListener('mousemove', handlerMouseMove)
    return () => window.removeEventListener('mousemove', handlerMouseMove)
  })
  return position
}

export const useScroll = (defaultSize = [100, 100], dom) => {
  const [ size, setSize ] = useState(defaultSize);
  console.log(dom);
  useEffect(() => {
    let handlerDomScrollSize = (event) => {
      console.log(event);
    }
    // dom.addEventListener('scroll', handlerDomScrollSize)
    return () => {
      dom.removeEventListener('scroll', handlerDomScrollSize)
    }
  })  
  return size;
}