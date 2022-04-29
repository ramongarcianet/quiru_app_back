import {addDoc, collection, onSnapshot, setDoc, getDoc, getFirestore, doc, updateDoc, deleteDoc, query, where, arrayUnion} from 'firebase/firestore'
import {firestore} from '../config/firebase'
import {ref} from 'vue'
export default {
    item: ref({}),
    agregar: (email) => {
        const referencia = doc( firestore, 'marketing/earlyAdopters' )
        return updateDoc( referencia, {
            registro: arrayUnion({
                email,
                creadoEl: new Date()
            })
        } )
    }
}