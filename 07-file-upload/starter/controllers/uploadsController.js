const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { CustomError } = require('../errors')
const cloudinary = require('cloudinary')

// const uploadProductLocal = async (req, res) => {
//   const photoImage = req.files.image
//   if (!req.files) {
//     throw new CustomError.BadRequestError('No file uploaded')
//   }
//   if (!photoImage.mimeType.startsWith('image')) {
//     throw new CustomError.BadRequestError('Image not found')
//   }
//   const maxSize = 1000
//   if (photoImage.size > maxSize) {
//     throw new CustomError.BadRequestError('please upload a small image')
//   }
//   const photoPath = path.join(
//     __dirname,
//     '../public/uploads/' + `${photoImage.name}`
//   )
//   await photoImage.mv(photoPath)

//   res
//     .status(StatusCodes.OK)
//     .json({ image: { src: `/uploads/${photoImage.name}` } })
// }
const uploadProduct = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  )
  console.log(result)
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = {
  uploadProduct,
}
