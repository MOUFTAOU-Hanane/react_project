import { useState, useEffect } from 'react';
import { ref, listAll } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from './Navbar';

const Fichiers = () => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const getFileList = async () => {
            try {
                const filesRef = ref(storage, '/files');
                const filesList = await listAll(filesRef);
                const fileNames = filesList.items.map((item) => item.name);
                setFileList(fileNames);
            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };

        getFileList();
    }, []);

    return (
        <div className='container'>
            <Navbar />
            <div className='row'>
                <ul className="list-group">
                    {fileList.map((fileName, index) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                            {fileName}
                            <div>
                                <button type="button" className="btn btn-primary">Partager</button>
                                <button type="button" className="btn btn-danger">Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Fichiers;
