import React, { useState, useRef, useEffect } from 'react'
// import { v4 } from 'uuid'
import styled from 'styled-components'
import { MenuItem } from './MenuItem'
import { Cover } from './Cover'
import { useSpring, animated as a, useChain, useTrail, useSprings } from 'react-spring'
import { Sling as Hamburger } from 'hamburger-react'
import ParticlesBg from 'particles-bg'

import Img1 from '../img/1.jpg'
import Img2 from '../img/2.jpg'
import Img3 from '../img/3.jpg'
import Img4 from '../img/4.jpg'
import Img5 from '../img/4.jpg'

const Container = styled.div`
    position: fixed;
    z-index: 100;
`

const Content = styled(a.div)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: none;

    > div {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;

        &:first-of-type {
            left: 0;
        }

        &:last-of-type {
            right: 0;
        }
    }

`

const Pictures = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        opacity: 0;
        transform-origin: 50% 50%;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: 50% 50%;
        }
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: black;
            opacity: 0.5;
        }
    }

`

const Trigger = styled(a.div)`
  position: fixed;
  top: 32px;
  right: 32px;
  transition: 450;
  &:hover {
      cursor: pointer;
  }
`;

const Links = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 800;
  text-transform: lowercase;
  li {
    font-size: 85px;
    transform-origin: 100% 25%;
  }
`;

const images = [Img1, Img2, Img3, Img4, Img5]

export const Menu = () => {

    const links = ['Меню', 'Привет', 'Меню', 'Привет', 'Меню'];

    const [hoverIndex, setHoverIndex] = useState(null)
    const [show, setShow] = useState(false);

    const coverRef = useRef()
    const coverSpring = useSpring({
        transform: show ? 'translate(50%, -50%) scale(1)' : 'translate(50%, -50%) scale(0)',
        ref: coverRef
    });

    const contentRef = useRef()
    const contentSpring = useSpring({
        display: show ? 'block' : 'none',
        ref: contentRef
    })

    const listRef = useRef()
    const listTrail = useTrail(links.length, {
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.6)',
        config: {
            tension: 450,
        },
        ref: listRef
    })

    const menuSpring = useSpring({
        color: show ? '#fff' : '#000'
    })

    useChain(
        show ? [coverRef, contentRef, listRef] : [listRef, coverRef, contentRef],
        show ? [0, 0, 0.2] : [0, 0.2, 0.4]
    )

    const onMouseOver = (i) => {
        setHoverIndex(i)
    }

    const [piSprings, piSet] = useSprings(images.length, () => ({
        opacity: 0,
        transform: 'translateX(0px) scale(1)'
    }))

    useEffect(() => {
        piSet((i) => ({
            opacity: hoverIndex === i ? 1 : 0,
            transform: hoverIndex === i ? 'translateX(0px) scale(1.08)' : 'translateX(-500vw) scale(1)',
            config: hoverIndex === i ? { delay: 5000 } : { duration: 200 },
            delay: hoverIndex === i ? 200 : 0,
        }));
    // eslint-disable-next-line
    }, [hoverIndex]);

    return (
        <Container>
            <Cover style={coverSpring} />
            <Content style={contentSpring}>
                <div>
                    <Pictures>
                        {piSprings.map((props, index) => (
                            <a.div style={props} key={`${links[index]}_key`}>
                                <img src={images[index]} alt={links[index]} />
                            </a.div>
                        ))}
                    </Pictures>
                </div>
                <div>
                    <Links 
                        onMouseLeave={() => {
                            setHoverIndex(null)
                        }}
                    >
                        {listTrail.map((trailProps, index) => (
                            <a.li style={trailProps} key={`${links[index]}_key`}>
                                <MenuItem
                                    onMouseOver={() => onMouseOver(index)}
                                >
                                    {links[index]}
                                </MenuItem>
                            </a.li>
                        ))}
                    </Links>
                </div>
                <ParticlesBg color={"#ff0000"} num={5} type="circle" bg={true} />
            </Content>
            <Trigger style={menuSpring}>
                <Hamburger toggled={show} toggle={setShow} />
            </Trigger>
        </Container>
    )
}
