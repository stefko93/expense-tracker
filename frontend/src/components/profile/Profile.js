import React from 'react';

import Avatar from './Avatar';

export default function Profile(props) {
    return (
        <div>
            <Avatar />
            <div>
                {props.name}
            </div>
        </div>
    )
}
