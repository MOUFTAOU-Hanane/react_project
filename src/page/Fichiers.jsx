import { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from './Navbar';
import { onAuthStateChanged } from 'firebase/auth'; 
import {  auth } from '../config/firebase';



const Fichiers = () => {
    const [fileList, setFileList] = useState([]);
    const [email, setEmail] = useState('');
    const [file_name, setFileName] = useState('');


    useEffect(() => {
        const getFileList = async () => {
            try {
                const userUID = auth.currentUser.uid;

                const filesRef = ref(storage, `/files/${userUID}/`);
                const filesList = await listAll(filesRef);
                const fileNames = filesList.items.map((item) => item.name);
                setFileList(fileNames);
                console.log(userUID)

            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };

        getFileList();
    }, []);
    const sendFile = async () => {
        try {
            const db = getFirestore();
            await addDoc(collection(db, "shared_files"), {
                email: email,
                file_name: file_name,
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    return (
        <div className='container'>
            <Navbar />
            <div className='container mt-4'>
            <div className='row mt-4'>
                <ul className="list-group">
                    {fileList.map((fileName, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            {fileName}
                            <div>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Partager</button>
                                <button type="button" className="btn btn-danger">Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
                
            </div>
            
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className="text-start" onSubmit={sendFile}>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                        
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fichiers;
