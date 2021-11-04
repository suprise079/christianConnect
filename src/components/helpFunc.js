// this file can contain any custom function that can be used to many files.

import { Camera, CameraResultType } from '@capacitor/camera';



var Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
]
// returns current date and time in the format
// month/day/year - hr:min:sec
const getCurTimeDate = () => {
  var obj = new Date();
  var t = obj.getHours() + ":"+ obj.getMinutes() + ":" + obj.getSeconds();
  var d = Months[obj.getMonth()] + " " + obj.getDate() + ", " + obj.getFullYear();
  return d + " - " + t;
}









// function to retrieve an image
export const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.base64String;

  // Can be set to the src of an image now
  // imageElement.src = imageUrl;
  return imageUrl
};


export default getCurTimeDate;