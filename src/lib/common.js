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

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        820,
        648,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
        0,
        648,
      );
    } catch (err) {
      reject(new Error('fail'));
    }
  });
}


export async function fileChangedHandler(e) {
  const { files } = e.target;

  if (files.length > 0) {
    const filesArray = Array.from(files).map(async (item) => {
      try {
        return await resizeImage(item);
      } catch (err) {
        return new Promise.reject(new Error(err));
      }
    });

    const allPromises = Promise.all(filesArray);
    return allPromises;
  }
  return new Error('no file');
}
