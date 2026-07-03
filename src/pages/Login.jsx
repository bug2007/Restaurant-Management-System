import { GlobalStyles, Box, Slide, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef, useState } from 'react'
import { carouselContent } from '../util/data.js';
import { Opacity } from '@mui/icons-material';

function Carousel() {
    return (
        <>
        <Box sx={{maxWidth: '500px', px: '3rem', pb: '2rem', minHeight: '500px', borderRadius: '10px', boxShadow: '0.5px 10px 12px 2px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'end', backgroundColor: 'primary.light'}}>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                // spaceBetween={50}
                slidesPerView={1}
                // navigation
                grabCursor={true}
                pagination={{ clickable: true }}
                speed={800}
                autoplay={{
                    delay: 3000, 
disableOnInteraction: false, // Keeps autoplay running even after the user drags or clicks a slide manually
                    pauseOnMouseEnter: true, // Pauses the timer when a user hovers their mouse over the image
                }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                style={{paddingBottom: '2rem'}}
                >
                {carouselContent.map((content) => (
                    <SwiperSlide key={content.heading}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img src={content.imgSrc} style={{width: '240px', height: '200px'}} />
                            <Typography>{content.heading}</Typography>
                            <Typography>{content.text}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </Box>
        </>
    )
}

export default function Login() {
    return (
        <>
        <GlobalStyles 
            styles={(theme) => ({ 
                body: { 
                background: `linear-gradient(to right, ${theme.palette.primary.light}, #dbc764)`,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center'
                },
                
                '.swiper-pagination-bullet': {
                    width: '18px',
                    height: '3px',
                    backgroundColor: 'black',
                    opacity: '0.3',
                    transition: 'all 0.3s ease',
                    borderRadius: '0',
                },

                '.swiper-pagination-bullet-active': {
                    width: '25px',
                    opacity: '1'
                }
            })} 
        />

        <Carousel />
        </>
    )
}