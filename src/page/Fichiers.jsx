import React, { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from './Navbar';
import { addDoc, collection, getFirestore, getDocs } from 'firebase/firestore'; 
import { auth } from '../config/firebase';
import { getFileDownloadURL } from '../config/urlFile';

const Fichiers = () => {
    const [fileList, setFileList] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedFileName, setSelectedFileName] = useState(''); 
    const [fileUrl, setFileUrl] = useState('');
    const [users, setUsers] = useState([]);
    const [showUserList, setShowUserList] = useState(false);
    const [clickedUser, setClickedUser] = useState(false); 

    const userUID = auth.currentUser.uid;

    useEffect(() => {
        const getFileList = async () => {
            try {   
                const filesRef = ref(storage, `/files/${userUID}/`);
                const filesList = await listAll(filesRef);
                const fileNames = filesList.items.map((item) => item.name);
                setFileList(fileNames);
            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };

        getFileList();

        const fetchUsers = async () => {
            const db = getFirestore();
            const usersCollection = collection(db, 'users');
            
            try {
              const querySnapshot = await getDocs(usersCollection);
              const usersData = querySnapshot.docs.map(doc => doc.data());
              setUsers(usersData);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
      
          fetchUsers();
    }, []);

    const getFileUrl = async (fileName) => {
        try {
            const url = await getFileDownloadURL(fileName); 
            setFileUrl(url);
        } catch (error) {
            console.error('Error getting file URL:', error);
        }
    };

    const sendFile = async (e) => {
        e.preventDefault();
        try {
            const db = getFirestore();
            await addDoc(collection(db, "shared_files"), {
                email: email,
                file_name: selectedFileName, 
                send_by: userUID
            });
            alert("fichier envoyé");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    const handleUserClick = (userEmail) => {
        setEmail(userEmail);
        setShowUserList(false);
        setClickedUser(true); // Indiquer que l'utilisateur a cliqué sur un élément de la liste
    };
    

    const handleEmailFocus = () => {
        setShowUserList(true);
    };

    return (
        <div className=''>
            <Navbar />
            <div className='container mt-4'>
                <div className='row mt-4'>
                    {fileList.length === 0 ? (
                        <p>Aucun fichier trouvé.</p>
                    ) : (
                        <ul className="list-group">
                            {fileList.map((fileName, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    {fileName}
                                    <div className='row'>
                                        <div className='col'> <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setSelectedFileName(fileName)}>Partager</button></div>
                                        <div className='col'><button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => getFileUrl(fileName)}>Voir</button></div>
                                        <div className='col'><button type="button" className="btn btn-danger mx-2">Supprimer</button></div>  
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Partager le fichier</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="text-start">
                            <input
                                            type="text"
                                            className="form-control"
                                            aria-describedby="emailHelp"
                                            label="Email"
                                            value={email}
                                            onFocus={handleEmailFocus} // Utilisation de handleEmailFocus pour gérer le focus
                                           
                                            required                                        />
                                <div className='my-4'>
                                {showUserList && (
                                    <ul className="list-group">
                                        {users.map((user, index) => (
                                            <li className="list-group-item" key={index} onClick={() =>  { handleUserClick(user.email)}}> 
                                                {user.email}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                </div>
                                <button type="submit" className="btn btn-primary" onClick={sendFile}>Partager</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Contenu du fichier</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <iframe src={fileUrl} width="100%" height="600px" title="File preview"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fichiers;
