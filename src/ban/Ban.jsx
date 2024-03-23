import styled from '@emotion/styled';
import React from 'react';

const BanList = ({ banList, removeFromBanList }) => {
    return (
        <div className="ban-list">
            <h1 style={{ color: '#1c1c1c' }}>Ban List</h1>
            <h4 style={{ color: '#1c1c1c' }}>Select and attribute that you wish to ban!</h4>
            <ul>
                {banList.map((item, index) => (
                    <li key={index}>
                        <span style={{ color: '#1c1c1c', fontWeight: 'strong'}}>{item}</span>{' '}
                        <br></br>
                        <button onClick={() => removeFromBanList(item)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BanList;