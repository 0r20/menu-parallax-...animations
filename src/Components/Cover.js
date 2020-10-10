import React from 'react'
import {animated as a} from 'react-spring'
import styled from 'styled-components'
import { COLORS } from '../constants'

const Circle = styled(a.div)`
    position: fixed;
    height: 250vw;
    width: 250vw;
    transform: translate(50%, -50%) scale(0);
    top: 0;
    right: 0;
    border-radius: 50%;
    background-color: ${COLORS.MENU_COVER};
`

export const Cover = props => <Circle  {...props} />

