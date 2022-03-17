import { useEffect } from 'react';

import './App.css';
import HomePage from './components/pages/HomePage/HomePage';

function App() {
    useEffect(() => {
        localStorage.setItem('cryptax_version', '1');
    }, []);

    return (
        <div className='App'>
            <HomePage />
        </div>
    );
}

export default App;
