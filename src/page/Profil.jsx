import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import Navbar from '../page/Navbar';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs,  getFirestore } from 'firebase/firestore';

const Profil = () => {
    const [userName, setUserName] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const db = getFirestore();
                const userCollection = collection(db, 'users');
                const q = query(userCollection, where('email', '==', user.email));
                const querySnapshot = await getDocs(q);
                const userDoc = querySnapshot.docs[0];
                if (userDoc) {
                    setUserName(userDoc.data().name);
                } else {
                    console.log('Aucun document trouvé pour cet utilisateur.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de l\'utilisateur:', error);
            }
        };

        if (user) {
            fetchUserName();
        }
    }, [user]);

    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate("/connexion");
                console.log('User signed out');
            })
            .catch((err) => {
                console.error('Erreur lors de la déconnexion de l\'utilisateur:', err.message);
            });
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='row mt-4'>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" value={user?.email || ''} readOnly />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputText3" className="col-sm-2 col-form-label">Nom</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={userName} readOnly />
                        </div>
                    </div>
                    
                    <button type="button" className="btn btn-danger" onClick={logout}>Déconnexion</button>
                </form>
            </div>
        </div>
    );
};

export default Profil;
