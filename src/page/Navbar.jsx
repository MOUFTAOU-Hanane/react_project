
import { Link } from 'react-router-dom';
const Navbar = () => {

   
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
  
    // const onSubmit = () => {
    //   alert(`Submitted ${name} ${email}`);
    // };
    
  
    return (
        <div className='container'>
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
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            
                            <li className='nav-item'>
                                <a className='nav-link'>
                                <Link to="/home">Home</Link>
                                    
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link'>
                                <Link to="/list">Fichiers</Link>
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link'>
                                <Link to="/home"> Profil</Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
  };

  export default Navbar
