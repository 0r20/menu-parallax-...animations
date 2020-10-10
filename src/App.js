import React, { useState, useRef } from 'react';
import './App.css';
import { useTransition, animated } from 'react-spring'
import { Box } from './Box'
import { Menu } from './Components/Menu'
import { DragSlider } from './Components/DragSlider'
import { RellaxDemo } from './Components/RellaxDemo'

const slides = [
  {
    id: 0,
    url: './img/1.jpg'
  },
  {
    id: 1,
    url: './img/2.jpg'
  },
  {
    id: 2,
    url: './img/3.jpg'
  },
  {
    id: 3,
    url: './img/4.jpg'
  }
]

function App() {

  const [activeIndex, setActiveIndex] = useState(0)

  const prevIndexRef = useRef(-1)

  const transitions = useTransition(slides[activeIndex], item => item.id, {
    from: { opacity: 0, transform: activeIndex > prevIndexRef.current ? 'translateX(100%)' : 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: activeIndex < prevIndexRef.current ? 'translateX(100%)' : 'translateX(-100%)'},
    // config: { mass: 1, tension: 100, friction: 14 },
    onRest: () => {
      prevIndexRef.current = activeIndex
    }
  })

  const [boxes, setBoxes] = useState([1, 2, 3, 4, 5])

  const onDelete = (item) => {
    setBoxes(boxes.filter(x => x !== item))
  }

  const transBoxes = useTransition(boxes, boxes => boxes, {
    from: { opacity: 0, width: 100, transform: "translateY(0px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: [{ transform: "translateY(100px)", opacity: 0 }, { width: 0 }],
    config: {
      duration: 1.2
    }
  })

  return (
    <div className="App">
      <Menu />

      <div className="slides">
        {transitions.map(({ item, props, key }) => item &&
          <animated.img
            className="slide"
            src={require(`${item.url}`)}
            key={key}
            style={props}
          />
        )}
      </div>
      <div className="btns">
        <button onClick={() => setActiveIndex(activeIndex - 1)} disabled={activeIndex === 0}>&larr;</button>
        <button onClick={() => setActiveIndex(activeIndex + 1)} disabled={activeIndex === 3}>&rarr;</button>
      </div>

      <DragSlider />

      <div className="wrapper">
        <RellaxDemo />
      </div>      

    </div>
  );
}

export default App;