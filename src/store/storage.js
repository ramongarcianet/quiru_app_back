import { ref as StorageRef, uploadBytesResumable, getDownloadURL, getStorage, getMetadata, getBytes, deleteObject  } from "firebase/storage";
import {ref} from 'vue'
import {storage} from '../config/firebase'
export const progressFile = ref(0)
export const setFile = (file, idOdontograma) => new Promise( (resolve, reject )=> {
    if(!file) return reject( false )
    if(file.size > 4000000) return reject('archivo muy pesado')
    if(file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'application/pdf') return reject('formato no admitido')
    const uploadTask = uploadBytesResumable(
        StorageRef(storage, 'images/'+ idOdontograma+'/' + file.name ), 
        file, 
        { contentType: file.type }
    )
    //+ new Date().toLocaleString('es-ES', {dateStyle:'medium', timeStyle:'medium'})
    uploadTask.on(
        'state_changed',
        snapshot => progressFile.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        error => reject(error.code),
        () => resolve(uploadTask.snapshot.ref.fullPath )
    )
})

export const dowFile = (file) => new Promise ( (resolve, reject)=>{
    if(!file) reject( false )
    console.log(file)
    return getDownloadURL(StorageRef(storage, file))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            //xhr.send();
            resolve()
        })
        .catch((error) => {
        console.log('error')
        });
})

export const borrarFile = (file) => new Promise ((resolve, reject) => {
    console.log(file)
    const desertRef = StorageRef(storage, file);
    deleteObject(desertRef).then(() => {
      }).catch((error) => {

      });      
})

export const getUrlbyFileRef = (fileRef) => getDownloadURL(StorageRef(storage, fileRef))
export const downloadbyFileRef = (fileRef) => getBytes(StorageRef(storage, fileRef))
export const getMetadataByFileRef = (fileRef) => getMetadata(StorageRef(storage, fileRef))



