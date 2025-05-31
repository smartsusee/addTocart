import React from 'react';

const Adminpage1 = () => {
    return (
        <div>
            <h1>Admin Page 1</h1>
            <p>This is the first admin page. Here you can manage various administrative tasks.</p>
            {/* Add more admin functionalities here */}
            <button onClick={() => alert('Feature coming soon!')}>Manage Settings</button>
            <button onClick={() => alert('Feature coming soon!')}>View Logs</button>
        </div>
    );
}

export default Adminpage1;
