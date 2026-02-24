import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RefreshCcw, LayoutGrid, CheckCircle } from 'lucide-react';

const PhotoResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const imageData = location.state?.image;
    const employeeData = location.state?.employee;

    if (!imageData || !employeeData) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--danger-color)' }}>No Photo Captured</h2>
                <Link to="/list" className="btn btn-primary">Return to Directory</Link>
            </div>
        );
    }

    const handleRetake = () => {
        navigate(`/details/${encodeURIComponent(employeeData[0])}`, { state: { employee: employeeData } });
    };

    const handleFinish = () => {
        navigate('/list');
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(46, 160, 67, 0.1)', borderRadius: '50%', marginBottom: '1rem', color: 'var(--success-color)' }}>
                    <CheckCircle size={32} />
                </div>

                <h1 className="title" style={{ marginBottom: '0.5rem' }}>Identity Captured Successfully</h1>
                <p className="subtitle" style={{ marginBottom: '2rem' }}>
                    Photo verified for employee: <strong style={{ color: '#fff' }}>{employeeData[0]}</strong>
                </p>

                <div style={{
                    background: '#000',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '2rem',
                    border: '1px solid var(--surface-border)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    maxWidth: '500px',
                    margin: '0 auto 2rem'
                }}>
                    <img
                        src={imageData}
                        alt={`Captured for ${employeeData[0]}`}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        className="btn btn-icon"
                        style={{ background: 'var(--surface-color)', padding: '0.75rem 1.5rem', flex: '1', minWidth: '150px', maxWidth: '200px', justifyContent: 'center' }}
                        onClick={handleRetake}
                    >
                        <RefreshCcw size={18} /> Retake Photo
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.5rem', flex: '1', minWidth: '150px', maxWidth: '200px', justifyContent: 'center' }}
                        onClick={handleFinish}
                    >
                        <LayoutGrid size={18} /> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoResult;
