import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { ref } from 'vue'
//import { logEvent } from 'firebase/analytics'

export default {
    item: ref({}),
    agregar: (item) => {
        const referencia = doc(firestore, 'marketing/earlyAdopters')
        return updateDoc(referencia, {
            registro: arrayUnion({
                ...item,
                creadoEl: new Date()
            })
        })
    },
    //registrarEvento: (eventName) => logEvent(analytics, eventName)
}