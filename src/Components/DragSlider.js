import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated as a } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import Img1 from '../img/1.jpg';
import Img2 from '../img/2.jpg';
import Img3 from '../img/3.jpg';
import Img4 from '../img/4.jpg';

const data = [Img1, Img2, Img3, Img4];

const img = ['first', 'second', 'third', 'fourth'];

const Slider = styled(a.div)`
    width: 100%;
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

const SliderItem = styled(a.div)`
    flex-shrink: 0;
    width: 100%;
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    img {
        width: 50%;
        object-fit: cover;
    }
`;

const THRESHOLD = 15;

export const DragSlider = () => {

    const [animated, setAnimated] = useState(false);
    const [{ x }, set] = useSpring(() => ({
        x: [0, 0]
    }));

    const [activeItem, setActiveItem] = useState(0);

    const bind = useDrag(({ movement: [mx] }) => {
        // block animation
        if (animated) {
            return;
        }

        let moveX = (mx / window.innerHeight) * 100;
        let rotate = 360 * (moveX / 100);

        if (moveX > 0 && activeItem === 0) {
            return;   
        }
        if (moveX < 0 && activeItem === data.length - 1) {
            return;   
        }

        if (moveX < -THRESHOLD) {
            // going right
            moveX = -100;
            rotate = 360;
            animateNextSlide(1);

        } else if (moveX > THRESHOLD) {
            // going left
            moveX = 100;
            rotate = -360;
            animateNextSlide(-1);
        }

        moveX -= 100 * activeItem;
        rotate += 360 * activeItem; 

        set({
            x: [moveX, rotate]
        });
    });

    const animateNextSlide = (direction) => {
        setAnimated(true);
        setActiveItem(activeItem + direction);
        setTimeout(() => {
            setAnimated(false);
        }, 1000);
    }

    return (
        <Slider {...bind()}>
            {data.map((el, index) =>
                <SliderItem
                    key={`${img[index]}_key`}
                    style={{
                        transform: x.interpolate((moveX, rotate) => `translate3d(${moveX}%, 0px, 0px) rotate(${rotate}deg)`)
                    }}
                >
                    <img src={el} alt="el"></img>
                </SliderItem>)}
        </Slider>
    );
}
