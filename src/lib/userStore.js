// import { doc, getDoc } from 'firebase/firestore';
// import { create } from 'zustand'
// import { db } from './firebase';

// export const useUserStore = create((set) => ({
//     currentUser: null,
//     isLoading: true,
//     fetchUserInfo: async (uid) => {
//         if (!uid)
//             return set({ currentUser: null, isLoading: false });

//         try {

//             const docRef = doc(db, "users", uid);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 set({currentUser: docSnap.data(),isLoading:false});
//             }
//             else{
//                 set({currentUser:null,isLoading:false});
//             }

//         } catch (error) {
//             console.log(error)
//             return set({ currentUser: null, isLoading: false });
//         }
//     },
// }))






import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                set({ currentUser: { ...userData, bio: userData.bio || "No bio available" }, isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (error) {
            console.log(error);
            return set({ currentUser: null, isLoading: false });
        }
    },
}));
