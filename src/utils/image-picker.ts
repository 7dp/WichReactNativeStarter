import { t } from '@/i18n'
import ImageCropPicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker'

const param: Options = {
  compressImageQuality: 0.8,
  cropperCancelText: t('imagePicker.cancel'),
  cropperChooseText: t('imagePicker.apply'),
  cropping: true,
  height: 720,
  multiple: false,
  width: 720,
}

const openCamera = async (options?: Options): Promise<ImageOrVideo> => {
  return await ImageCropPicker.openCamera({
    ...options,
    ...param,
  })
}

const openGallery = async (options?: Options): Promise<ImageOrVideo> => {
  return await ImageCropPicker.openPicker({
    ...options,
    ...param,
  })
}

const openCropper = async (path: string): Promise<ImageOrVideo> => {
  return await ImageCropPicker.openCropper({
    ...param,
    mediaType: 'photo',
    path,
  })
}

const ImagePicker = {
  openCamera,
  openCropper,
  openGallery,
}

export { ImagePicker }
