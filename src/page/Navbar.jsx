import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className=''>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100'>
                            <li className='nav-item mx-4'>
                                <a className='nav-link'>
                                    <Link to="/home">Acceuil</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/list"> Mes Fichiers</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/send_list">Fichiers Partagés</Link>
                                </a>
                            </li>
                            <li className='nav-item mx-4 text-dark'>
                                <a className='nav-link'>
                                    <Link to="/profil"> Profil</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
