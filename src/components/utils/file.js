import { findKey } from '~utils/object'
import { isOfMimeType, canvasToBlob } from '~utils/blob'

const DEFAULT_ACCEPTED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'pdf']
const MAX_FILE_SIZE_ACCEPTED_BY_API = 10000000 // The Onfido API only accepts files below 10 MB
export const validateFileTypeAndSize = (
  file,
  acceptedTypes = DEFAULT_ACCEPTED_FILE_TYPES
) =>
  findKey(
    {
      INVALID_TYPE: (file) => !isOfMimeType(acceptedTypes, file),
      INVALID_SIZE: (file) => file.size > MAX_FILE_SIZE_ACCEPTED_BY_API,
    },
    (checkFn) => checkFn(file)
  )

export const resizeImageFile = (file, onImageResize) => {
  const reader = new FileReader()
  reader.onload = (readerEvent) => {
    const image = new Image()
    image.onload = () => {
      // We want to resize to 720p (1280×720px) and maintain aspect ratio
      const MAX_SIZE_IN_PIXEL = 1280
      const ORIGNAL_WIDTH = image.width
      let resizedWidth
      const ORIGINAL_HEIGHT = image.height
      let resizedHeight
      const widthOnePercent = ORIGNAL_WIDTH / 100
      const heightOnePercent = ORIGINAL_HEIGHT / 100
      let imageCurrentPercent
      if (ORIGNAL_WIDTH > ORIGINAL_HEIGHT) {
        // landscape orientation
        resizedWidth = MAX_SIZE_IN_PIXEL
        imageCurrentPercent = resizedWidth / widthOnePercent
        resizedHeight = heightOnePercent * imageCurrentPercent
      } else {
        // portrait orientation
        resizedHeight = MAX_SIZE_IN_PIXEL
        imageCurrentPercent = resizedHeight / heightOnePercent
        resizedWidth = widthOnePercent * imageCurrentPercent
      }
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = resizedWidth
      tempCanvas.height = resizedHeight
      tempCanvas
        .getContext('2d')
        .drawImage(image, 0, 0, resizedWidth, resizedHeight)
      return canvasToBlob(tempCanvas, onImageResize, 'image/png')
    }
    image.src = readerEvent.target.result
  }
  reader.readAsDataURL(file)
}
