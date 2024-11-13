"use client"

import { Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export const SurveyChart = () => {

    const data = [
        { name: 'Question 1', No: 40, Yes: 24, Maybe: 24 },
        { name: 'Question 2', No: 30, Yes: 18, Maybe: 3 },
        { name: 'Question 3', No: 20, Yes: 8, Maybe: 9 },
        { name: 'Question 4', No: 27, Yes: 8, Maybe: 2 },
        { name: 'Question 5', No: 19, Yes: 48, Maybe: 26},
    ];

    return (
        <div className="bg-white p-2 h-[500px] w-full rounded-lg shadow border-2 flex items-center justify-center text-sm text-gray-500 font-medium relative">
            <div className='w-full h-[80%] flex flex-col justify-center items-center gap-2'>
                <h2 className='text-center text-base md:text-lg'>Survey Results</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis>
                            <Label value="No of Participants" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" stroke="#9f9f9f" vertical={false} />
                        <Bar dataKey="Yes" fill="#ff2257" background={{ fill: 'transparent' }} />
                        <Bar dataKey="No" fill="#00d384" background={{ fill: 'transparent' }} />
                        <Bar dataKey="Maybe" fill="#FFC400" background={{ fill: 'transparent' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div >
    );
};
