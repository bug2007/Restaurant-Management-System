// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, A11y, Autoplay } from 'swiper/modules';
// import { Box, Typography } from '@mui/material'

// import 'swiper/css';
// import 'swiper/css/pagination';
 
// import { carouselContent } from '../util/data.js';
// import classes from './Login.module.css'

// export default function Carousel({className}) {
//     return (
//         <>
//         <Box sx={{display: 'flex', alignItems: 'center', maxWidth: '55%', px: '3rem', backgroundColor: 'primary.light'}} className={className} >
//             <Swiper
//                 modules={[Pagination, A11y, Autoplay]}
//                 // spaceBetween={50}
//                 slidesPerView={1}
//                 // navigation
//                 grabCursor={true} 
//                 pagination={{ clickable: true }}
//                 loop={true}
//                 speed={800}
//                 autoplay={{
//                     delay: 3000, 
//                     disableOnInteraction: false, // Keeps autoplay running even after the user drags or clicks a slide manually
//                     // pauseOnMouseEnter: true, // Pauses the timer when a user hovers their mouse over the image
//                 }}
//                 // scrollbar={{ draggable: true }}
//                 onSwiper={(swiper) => console.log(swiper)}
//                 onSlideChange={() => console.log('slide change')}
//                 style={{paddingBottom: '8rem'}}
//                 >
//                 {carouselContent.map((content) => (
//                     <SwiperSlide key={content.heading}>
//                         <Box sx={{mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '35px', textAlign: 'center', maxWidth: '528px', minHeight: '550px' }}>
//                             <img src={content.imgSrc} style={{marginBottom: '-10px'}} />
//                             <Typography sx={{fontSize: '2rem', lineHeight: '120%', fontWeight: 'bold'}}>{content.heading}</Typography>
//                             <Typography sx={{fontSize: '20px'}}>{content.text}</Typography>
//                         </Box>
//                     </SwiperSlide>
//                 ))}
                
//             </Swiper>
//         </Box>
//         </>
//     )
// }