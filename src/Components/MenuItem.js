import React, { useState } from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'
import { animated as a, useSpring } from 'react-spring'

const Item = styled.div`
    position: relaitive;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: inherit;
    display: inline-block;
    width: auto;
    color: rgba(255, 255, 255, 0.3);
    padding: 10px 0;
    &:hover {
        cursor: pointer;
    }
`

const Mask = styled(a.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    color: white;
    > p {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: auto;
        margin: 0;
        padding: 10px 0;
  }
`

export const MenuItem = ({ children, onMouseOver }) => {

    const [isHovered, setIsHovered] = useState(false)

    const maskSpring = useSpring({
        width: isHovered ? '100%' : '0%',
        config: {
            duration: 300
        }
    })

    return (
        <Item
            onMouseEnter={() => {
                setIsHovered(true)
                onMouseOver()
            }}
            onMouseLeave={() => {
                if (isHovered) {
                    setIsHovered(false)
                }
            }}
        >
            {`${children}.`}
            <Mask style={maskSpring}>
                <p>
                    {children}
                    <span style={{ color: COLORS.ERROR }}>.</span>
                </p>
            </Mask>
        </Item>
    )
}
