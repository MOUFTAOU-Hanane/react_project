import React, { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from './Navbar';
import { addDoc, collection, getFirestore } from 'firebase/firestore'; 
import { auth } from '../config/firebase';
import { getFileDownloadURL } from '../config/urlFile';


const Fichiers = () => {
    const [fileList, setFileList] = useState([]);
    const [email, setEmail] = useState('');
    const [selectedFileName, setSelectedFileName] = useState(''); 
    const [fileUrl, setFileUrl] = useState(''); // État pour stocker le nom du fichier sélectionné
    const userUID =auth.currentUser.uid;

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
    }, []);

    const getFileUrl = async (fileName) => {
        try {
            const url = await getFileDownloadURL(fileName); 
            setFileUrl(url);
        } catch (error) {
            console.error('Error getting file URL:', error);
        }
    };

    const sendFile  = async (e) =>{
        e.preventDefault();
        try {
            const db = getFirestore();
                // Enregistrer uniquement le nom du fichier sélectionné
            await  addDoc(collection(db, "shared_files"), {
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
                                    <div className=''>
                                        <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setSelectedFileName(fileName)}>Partager</button>
                                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => getFileUrl(fileName)}>Voir</button>
                                        <button type="button" className="btn btn-danger mx-2">Supprimer</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
    
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Partager le fichier</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="text-start">
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
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
