import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'


import './SwipeButtons.css'

export default function SwipeButtons() {
    return (
        <div className='swipe-buttons'>
            <IconButton>
                <ReplayIcon fontSize='large' />
            </IconButton>
            <IconButton>
                <CloseIcon fontSize='large' />
            </IconButton>
            <IconButton>
                <StarRateIcon fontSize='large' />
            </IconButton>
            <IconButton>
                <FavoriteIcon fontSize='large' />
            </IconButton>
            <IconButton>
                <FlashOnIcon fontSize='large' />
            </IconButton>
        </div>
    )
}
