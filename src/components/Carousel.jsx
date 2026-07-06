import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { Box, Typography } from '@mui/material'

import 'swiper/css';
import 'swiper/css/pagination';
 
import { carouselContent } from '../util/data.js';

export default function Carousel() {
    return (
        <>
        <Box sx={{maxWidth: '650px', px: '3rem', py: '2rem', borderRadius: '10px', boxShadow: '0.5px 10px 12px 2px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'end', backgroundColor: 'primary.light'}}>
            <Swiper
                modules={[Pagination, A11y, Autoplay]}
                // spaceBetween={50}
                slidesPerView={1}
                // navigation
                grabCursor={true} 
                pagination={{ clickable: true }}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, // Keeps autoplay running even after the user drags or clicks a slide manually
                    pauseOnMouseEnter: true, // Pauses the timer when a user hovers their mouse over the image
                }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                style={{paddingBottom: '0.5rem'}}
                >
                {carouselContent.map((content) => (
                    <SwiperSlide key={content.heading}>
                        <Box sx={{px: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', textAlign: 'center', maxWidth: '528px', minHeight: '550px' }}>
                            <img src={content.imgSrc} style={{width: '240px', height: '200px', marginBottom: '15px'}} />
                            <Typography sx={{fontSize: '2rem', lineHeight: '120%', fontWeight: 'bold'}}>{content.heading}</Typography>
                            <Typography sx={{fontSize: '20px'}}>{content.text}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </Box>
        </>
    )
}