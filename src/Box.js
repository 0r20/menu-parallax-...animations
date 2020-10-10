import React from 'react'
import { animated } from 'react-spring'

export const Box = ({props, item, onDelete }) => {
    return (
        <animated.div style={props} className="Box">
            {item}
            <button onClick={() => onDelete(item)}>Delete</button>
        </animated.div>
    )
}
