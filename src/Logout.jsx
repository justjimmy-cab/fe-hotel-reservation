import { Button } from '@mui/material';
import { logout } from './services/auth';

const handleLogout = () => {
    logout();
};


const Logout = () => {
    return (
        <Button 
            variant='contained' 
            sx={{marginRight: '-85%'}}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
}

export default Logout;
