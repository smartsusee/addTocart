import React from 'react';

const Userpage1 = () => {
    return (
        <div>
            <h1>User Page 1</h1>
            <p>This is the first user page. Here you can view your profile and manage your account settings.</p>
            {/* Add more user functionalities here */}
            <button onClick={() => alert('Feature coming soon!')}>View Profile</button>
            <button onClick={() => alert('Feature coming soon!')}>Manage Account</button>
        </div>
    );
}

export default Userpage1;
