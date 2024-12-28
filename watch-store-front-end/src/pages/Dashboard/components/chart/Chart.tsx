import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import styles from './Chart.module.scss';
import * as orderServices from '../../../../services/orderServices';
import PreLoader from '../../../../components/PreLoader';

const cx = classNames.bind(styles);

interface ChartProps {
    title?: string;
    aspect?: any;
}
const Chart = ({ title, aspect }: ChartProps) => {
    const [data, setData] = useState<{ name: string; $: number }[] | undefined>(
        []
    );
    const [loading, setLoading] = useState(false);

    // Bar chart
    // const data = [
    //     {
    //         name: 'January',
    //         SB: 4000,
    //         TA: 2400,
    //         amt: 2400,
    //     },
    //     {
    //         name: 'February',
    //         SB: 3000,
    //         TA: 1398,
    //         amt: 2210,
    //     },
    //     {
    //         name: 'March',
    //         SB: 2000,
    //         TA: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'April',
    //         SB: 2780,
    //         TA: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'MAY',
    //         SB: 1890,
    //         TA: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'JUNE',
    //         SB: 2390,
    //         TA: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'JULY',
    //         SB: 3490,
    //         TA: 4300,
    //         amt: 2100,
    //     },
    // ];

    // Line Chart
    // const data = [
    //     {
    //         name: 'Page A',

    //         $: 2400,
    //     },
    //     {
    //         name: 'Page B',

    //         $: 2210,
    //     },
    //     {
    //         name: 'Page C',

    //         $: 2290,
    //     },
    //     {
    //         name: 'Page D',

    //         $: 2000,
    //     },
    //     {
    //         name: 'Page E',

    //         $: 2181,
    //     },
    //     {
    //         name: 'Page F',

    //         $: 2500,
    //     },
    // ];

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const response = await orderServices.getTheLast6MonthsOfOrders();

            setData(response);
            setLoading(false);
        };

        fetchApi();
    }, []);

    if (loading) {
        return <PreLoader show />;
    }

    return (
        <div className={cx('chart')}>
            <h2 className={cx('chart__title')}>{title}</h2>
            <ResponsiveContainer width="100%" aspect={aspect}>
                {/* <BarChart
                    width={730}
                    height={250}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    data={data}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="gray"
                        className="chatGrid"
                    />
                    <XAxis dataKey="name" />

                    <Tooltip />
                    <Legend />
                    <Bar dataKey="SB" fill="#8884d8" />
                    <Bar dataKey="TA" fill="#82ca9d" />
                </BarChart> */}
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    
                >
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="348.692"
                            y1="0"
                            x2="348.692"
                            y2="221.559"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#CEDDFF" />
                            <stop
                                offset="1"
                                stop-color="#CEDDFF"
                                stop-opacity="0"
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#EAEAEC" vertical={false} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="$"
                        stroke="#5185F7"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
