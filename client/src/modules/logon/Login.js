import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/loginStyles.css';
import usernamelogo from '../../logo/icons8-username-50.png';
import passwordlogo from '../../logo/icons8-sign-in-form-password-50.png';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

export default function Login({ setIsLoggedIn }) {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         // Optionally verify token with the server here
    //         setIsLoggedIn(true); // Update your application state
    //     }
    // }, []);

//     useEffect(() => {
//         function isTokenExpired(token) {
//             try {
//                 const decoded = jwtDecode(token);
//                 const currentTime = Date.now() / 1000; // in seconds
//                 return decoded.exp < currentTime;
//             } catch (error) {
//                 console.error("Token decoding error:", error);
//                 return true; // Assume expired/invalid if error occurs
//             }
//         }
//         const token = localStorage.getItem('authToken');
//         if (!token || isTokenExpired(token)) {
//             localStorage.removeItem('authToken');
//             // Optionally, redirect to login or update state
// }
//     }, []);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make an API request to validate userid and password
        try {
            if (user.includes('PT')) {
                setRole('patient');
            } else if (user.includes('PHY')) {
                setRole('physician')
            } else if (user.includes('ADM')) {
                setRole('admin')
            }

            const response = await axios.post('http://127.0.0.1:5000/validate_credentials', 
            { userid: user, password: pwd, role: role });

            if (response.status === 200) {
                const data = response.data;
                if (data.valid) {
                    console.log('Credentials are valid');
        
                    setUser('');
                    setPwd('');
                    setIsLoggedIn(true);
        
                    // Conditionally route based on the user's role
                    switch (role) {
                        case 'patient':
                            navigate('/patienthome', { state: { user: user } });
                            break;
                        case 'admin':
                            navigate('/adminhome');
                            break;
                        case 'physician':
                            navigate('/physicianhome');
                            break;
                        default:
                            // Handle other roles or unknown roles
                            console.warn('Unknown role:', role);
                            break;
                    }
                } else {
                    setErrMsg('Invalid patientid or password');
                }
            } else {
                setErrMsg('Failed to validate credentials');
            }
        } catch (error) {
            console.error('Error validating credentials:', error);
            setErrMsg('Network Error');
        }
    }  

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'> {errMsg}</p>
            <h1>Account Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-cred'> 
                    <div style={{ display: 'flex', justifyContent: 'center', marginRight: '8px' }} >
                        <img src={usernamelogo} alt="Logo" height={40} width={40} />
                    </div>
                    <input 
                        type="text"
                        id='username'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    >
                    </input>
                </div>
                <div className='input-cred'> 
                    <div style={{ display: 'flex', justifyContent: 'center', marginRight: '8px' }} >
                            <img src={passwordlogo} alt="Logo" height={40} width={40} />
                    </div>
                    <input 
                        type="password"
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    >
                    </input>
                </div>
                <button>Login</button>
            </form>
        </section>

    )

}
