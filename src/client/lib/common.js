import Resizer from 'react-image-file-resizer';

export function getUserInfo() {
  return (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
    : {
      token: '',
      name: '',
      social_type: '',
      regState: ''
    });
}

export function saveUserInfo(data) {
  const dataObj = JSON.stringify(data);
  localStorage.setItem('userInfo', dataObj);
}

export function fileChangedHandler(e) {
  let fileInput = false;
  if (e.target.files[0]) {
    console.log(e.target.files[0]);
    fileInput = true;
  }
  if (fileInput) {
    try {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          console.log(uri);
          return uri;
        },
        'base64',
      );
    } catch (err) {
      return null;
    }
  }
  return null;
}
