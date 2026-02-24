import React, { useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { ArrowLeft, Camera, User, Building, MapPin, Calendar, DollarSign, Fingerprint } from 'lucide-react';

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    // employeeData = [Name, Position, Office, Extn, Start Date, Salary]
    const employeeData = location.state?.employee;

    if (!employeeData) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem', color: 'var(--danger-color)' }}>Employee Data Not Found</h2>
                <Link to="/list" className="btn btn-primary">Return to Directory</Link>
            </div>
        );
    }

    const capturePhoto = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        // Use location state to pass the image to next page
        navigate('/photo-result', { state: { image: imageSrc, employee: employeeData } });
    }, [webcamRef, navigate, employeeData]);

    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <button
                className="btn btn-icon"
                onClick={() => navigate('/list')}
                style={{ marginBottom: '1.5rem', background: 'var(--surface-color)' }}
            >
                <ArrowLeft size={18} /> Back to Directory
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Profile Card */}
                <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(88, 166, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                            <User size={40} />
                        </div>
                        <div>
                            <h1 className="title" style={{ marginBottom: '0.25rem', fontSize: '1.75rem' }}>{employeeData[0]}</h1>
                            <p className="subtitle" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>{employeeData[1]}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Offce Location</div>
                                <div style={{ fontWeight: 500, color: '#fff' }}>{employeeData[2]}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                                <Fingerprint size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Extension</div>
                                <div style={{ fontWeight: 500, color: '#fff' }}>{employeeData[3]}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                                <Calendar size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Start Date</div>
                                <div style={{ fontWeight: 500, color: '#fff' }}>{employeeData[4]}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--danger-color)' }}>
                                <DollarSign size={18} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Salary</div>
                                <div style={{ fontWeight: 500, color: 'var(--success-color)' }}>{employeeData[5]}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera Integration Card */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>Identity Verification</h2>
                    <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Capture a photo for employee verification and records.</p>

                    {!showCamera ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--surface-border)', padding: '2rem', textAlign: 'center' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                <Camera size={28} />
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Camera access is required to capture photos.</p>
                            <button className="btn btn-primary" onClick={() => setShowCamera(true)}>
                                Open Camera
                            </button>
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', background: '#000', position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-icon" style={{ flex: 1, justifyContent: 'center', background: 'var(--surface-color)' }} onClick={() => setShowCamera(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={capturePhoto}>
                                    <Camera size={18} /> Capture Photo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Details;
