import { image1, image2, image3, image4, image5, image6, image7 } from '@/assets'

/* DEVELOPMENT IMAGES */
const images = [image1, image2, image3, image4, image5, image6, image7]

export const IMAGE_LIST = images.map((img, i) => ({
  label: `Image ${i + 1}`,
  url: img,
}))

export const GET_IMAGE = (i: number) => ({
  label: `Image ${i}`,
  url: images[i - 1],
})

/* PRODUCTION IMAGES */
// export const IMAGE_LIST = Array.from({ length: 7 }, (_, i) => ({
//   label: `Image ${i + 1}`,
//   url: `https://firebasestorage.googleapis.com/v0/b/portfolio-f1335.appspot.com/o/test-images%2Fimage${i + 1}.webp?alt=media`,
// }))

// export const GET_IMAGE = (i: number) => ({
//   label: `Image ${i}`,
//   url: `https://firebasestorage.googleapis.com/v0/b/portfolio-f1335.appspot.com/o/test-images%2Fimage${i}.webp?alt=media`,
// })
