import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, MapPin, Search } from 'lucide-react';
import DataChart from '../components/DataChart';
import LocationsMap from '../components/LocationsMap';

const List = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('list'); // list, chart, map
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if not authenticated
        // Note: For a real app, use Context API, but localstorage is fine here
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            navigate('/');
        }

        const fetchData = async () => {
            try {
                const response = await fetch('https://backend.jotish.in/backend_dev/gettabledata.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: 'test',
                        password: '123456'
                    }),
                });

                const result = await response.json();
                // result.TABLE_DATA.data contains the array of arrays
                setData(result.TABLE_DATA.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleRowClick = (employeeData) => {
        // Navigate to details and pass data via state
        navigate(`/details/${encodeURIComponent(employeeData[0])}`, { state: { employee: employeeData } });
    };

    const filteredData = data.filter(emp => emp[0].toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--surface-border)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (error) {
        return <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger-color)' }}>{error}</div>;
    }

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="title" style={{ marginBottom: '0.25rem' }}>Employee Directory</h1>
                    <p className="subtitle">Manage and view employee information</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className={`btn ${activeTab === 'list' ? 'btn-primary' : 'btn-icon'}`}
                        onClick={() => setActiveTab('list')}
                        style={activeTab !== 'list' ? { background: 'var(--surface-color)', border: '1px solid var(--surface-border)' } : {}}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`btn ${activeTab === 'chart' ? 'btn-primary' : 'btn-icon'}`}
                        onClick={() => setActiveTab('chart')}
                        style={activeTab !== 'chart' ? { background: 'var(--surface-color)', border: '1px solid var(--surface-border)' } : {}}
                    >
                        <BarChart2 size={18} /> Charts
                    </button>
                    <button
                        className={`btn ${activeTab === 'map' ? 'btn-primary' : 'btn-icon'}`}
                        onClick={() => setActiveTab('map')}
                        style={activeTab !== 'map' ? { background: 'var(--surface-color)', border: '1px solid var(--surface-border)' } : {}}
                    >
                        <MapPin size={18} /> Map
                    </button>
                </div>
            </div>

            {activeTab === 'list' && (
                <div className="glass-panel animate-fade-in" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Search employees..."
                                style={{ paddingLeft: '2.5rem', marginBottom: 0 }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            Showing {filteredData.length} entries
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'rgba(0,0,0,0.2)' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Name</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Position</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Office</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Salary</th>
                                    <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((emp, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--surface-border)', transition: 'background 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '1rem 1.5rem', color: '#fff', fontWeight: 500 }}>{emp[0]}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>{emp[1]}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', background: 'rgba(88, 166, 255, 0.1)', color: 'var(--primary-color)', borderRadius: '4px', fontSize: '0.75rem' }}>
                                                <MapPin size={12} /> {emp[2]}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--success-color)' }}>{emp[5]}</td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <button onClick={() => handleRowClick(emp)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredData.length === 0 && (
                            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                No employees found matching your search.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'chart' && <DataChart data={data} />}
            {activeTab === 'map' && <LocationsMap data={data} />}
        </div>
    );
};

export default List;
