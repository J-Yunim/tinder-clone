import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';

import './Header.css'

function Header() {
    return (
        <div class='header'>
            <IconButton>
                <PersonIcon fontSize='large' className='header-icon' />
            </IconButton>
            <img className='header-logo' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/TinderIcon-2017.svg' alt='' />
            <IconButton>
                <ForumIcon fontSize='large' className='header-icon' />
            </IconButton>
        </div>
    )
}

export default Header
