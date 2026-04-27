import React from 'react';
import {
    LineChart,
    Line,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    XAxis,
} from 'recharts';
import { WeightEntry } from '../../types';

interface ProgressChartProps {
    data: WeightEntry[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    const formattedData = data.map((entry) => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        }),
    }));

    return (
        <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                    <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#d946ef" stopOpacity={1} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                        domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(20px)',
                            color: '#e2e8f0',
                            fontSize: '13px'
                        }}
                        itemStyle={{ color: '#06b6d4' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="url(#colorWeight)"
                        strokeWidth={3}
                        dot={{ fill: '#d946ef', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: '#06b6d4', strokeWidth: 0 }}
                        animationDuration={1500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;
