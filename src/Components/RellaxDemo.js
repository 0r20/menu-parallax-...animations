import React from 'react';
import styled from 'styled-components';
import ImgRellax from '../img/1.jpg';
import Baby from '../img/baby.jpg';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'
import { ParallaxItem } from './ParallaxItem'

const StyledRellax = styled(motion.div)`
    overflow: hidden;
    width: 90%;
    margin: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 1000px) {
        flex-direction: column;
    }
    > div {
        &:first-of-type {
            padding: 0 2rem;
            > p {
                &:last-of-type {
                    margin-bottom: 3rem;
                }
            }
        }
        &:last-of-type {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
            background-image: url(${ImgRellax});
            background-position: center center;
            background-size: 80% 100%;
            transition: background-size 3000ms linear; 
            &:hover {
                background-size: 96% 120%;
            }
        }
    }
`;

const StyledRelllexNext = styled.div`
    min-height: 100vh;
    background-color: purple;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
        padding: 4rem;
        color: #fff;
        font-size: 3rem;
    }
`;

const Cover = styled(motion.div)`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    opacity: 0;
    background: #fff;
    > div {
        padding: 2rem;
    }
    &:hover {
        cursor: pointer;
    }
`;

const StyledReveal = styled(motion.div)`
    height: 100vh;
    padding: 10vh;
    position: relative;
    .coverText {
        position: absolute;
        top: 30vh;
        left: -0.6rem;
        z-index: 20;
        > h1 {
            writing-mode: tb-rl;
            transform: rotate(180deg);
            text-transform: uppercase;
        }
    }
    > div {
        overflow: hidden;
        position: relative;
        /* height: 400px; */
        /* max-width: 100%; */
        padding: 0 0 40% 0;
        .coverImg {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background: #fff;
            z-index: 1;
        }
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;

export const RellaxDemo = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-200px'
    });

    const [refReveal, inViewReveal] = useInView({
        triggerOnce: true,
        rootMargin: '-200px'
    });

    const leftDiv = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 2
            }
        },
        closed: {
            opacity: 0,
            y: 200,
            transition: {
                duration: 2
            }
        }
    };

    const reveal = {
        open: {
            width: '0%'
        },
        closed: {
            width: '100%'
        }
    };

    const revealImg = {
        open: {
            scale: 1
        },
        closed: {
            scale: 2.2
        }
    };

    return (
        <div>
            <StyledRellax ref={ref} animate={inView ? 'open' : 'closed'} variants={leftDiv}>
                <div>
                    <h1>This is React-Rellax example</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, tempore.</p>
                    <p>Lorem, ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptates autem deleniti explicabo debitis voluptas at minima reiciendis et cum!</p>
                    <Button type="primary">Sumbit</Button>
                </div>
                <div>
                    <Cover whileHover={{ opacity: 0.8, transition: { duration: 0.5 } }} >
                        <div>
                            <h1>Пиздатая картинка</h1>
                            <p>Не поспоришь</p>
                        </div>
                    </Cover>
                </div>
            </StyledRellax>
            <StyledRelllexNext>
                <ParallaxItem className="parallax-item" range={1} direction={'down'}>
                    <h1>Let me fly</h1>
                </ParallaxItem>
            </StyledRelllexNext>
            <StyledReveal animate={inViewReveal ? 'open' : 'closed'} ref={refReveal}>
                <div>
                    <motion.div
                        className="coverImg"
                        variants={reveal}
                        transition={{
                            duration: 2,
                            ease: [0.7, 0.13, 0.23, 0.96]
                        }}
                    />
                    <motion.img
                        src={Baby}
                        alt="baby"
                        variants={revealImg}
                        transition={{
                            duration: 2,
                            ease: [0.7, 0.13, 0.23, 0.96]
                        }}
                    />
                </div>
            </StyledReveal>
        </div>
    );
}
