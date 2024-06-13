/* eslint-disable no-unused-vars */
// Update VisitorsCount component
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitorsCount = () => {
    const [visitors, setVisitors] = useState({ totalVisitors: 0, onlineVisitors: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/visitors');
                console.log(response)
                if (response.data.success && response.data.visitors) {
                    setVisitors(prev => ({ ...prev, totalVisitors: response.data.visitors.totalVisitors }));
                } else {
                    setError('Failed to retrieve visitors count');
                }
            } catch (error) {
                console.error('Error fetching visitors count:', error);
                setError('Error fetching visitors count');
            } finally {
                setLoading(false);
            }
        };

        const fetchActiveUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/active-users');
                console.log(response.data.activeUsers)
                if (response.data.success) {
                    setVisitors(prev => ({ ...prev, onlineVisitors: response.data.activeUsers }));
                } else {
                    setError('Failed to retrieve active users count');
                }
            } catch (error) {
                console.error('Error fetching active users count:', error);
                setError('Error fetching active users count');
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
        fetchActiveUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className='font-semibold text-2xl max-[600px]:text-lg my-5' >Ziyaretçi Takibi</h2>
            <p className=' text-lg text-gray-600'>Toplam Ziyaretçi :  <span  className="cursor-pointer text-orange-400 font-medium">{visitors.totalVisitors}</span> </p>
            <p className=' text-lg text-gray-600'>Aktif Ziyaretçi: <span  className="cursor-pointer text-orange-400 font-medium">{visitors.onlineVisitors}</span></p>
        </div>
    );
};

export default VisitorsCount;
