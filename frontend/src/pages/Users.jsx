import  { useEffect, useState } from 'react';
import axios from 'axios';
import User from '../components/User';  // ✅ Import User component

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            if (filter.trim() === "") return; // Don't fetch if search is empty
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/bulk?filter=${filter}`);
                console.log(response.data);
                setUsers(response.data.user);  // Ensure correct response key
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const debounceTimer = setTimeout(fetchUsers, 500); // Debounce API call
        return () => clearTimeout(debounceTimer); // Cleanup previous calls

    }, [filter]);  // Runs when `filter` changes

    return (
        <>
            <div className='font-bold mt-6'>Users</div>
            <div className='my-2'>
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    type="text"
                    className='w-full shadow rounded-lg px-2 border-slate-200 py-1'
                    placeholder='Search users...'
                />
            </div>
            <div>
            {users && users.length > 0 ? (
    users.map(user => <User key={user._id} user={user} />)
) : (
    <p>Loading users...</p>  // Show a loading message
)}

            </div>
        </>
    );
};

export default Users;
