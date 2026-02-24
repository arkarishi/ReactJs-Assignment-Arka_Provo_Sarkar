import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DataChart = ({ data }) => {
    // Extract top 10 and format salary to number
    const chartData = data.slice(0, 10).map(emp => {
        // Salary is something like "$320,800"
        const rawSalary = emp[5].replace(/[$,]/g, '');
        return {
            name: emp[0],
            salary: parseInt(rawSalary, 10)
        };
    });

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '2rem', height: '400px' }}>
            <h2 style={{ marginBottom: '1rem', color: '#fff' }}>Top 10 Salaries</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--primary-color)' }}
                    />
                    <Bar dataKey="salary" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DataChart;
