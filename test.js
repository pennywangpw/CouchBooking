image = {
    fieldname: 'image',
    originalname: 'image.png',
    encoding: '7bit'
}

const file_extension = image.originalname.slice(
    ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2
);

console.log(image.originalname.lastIndexOf('.'), file_extension)
