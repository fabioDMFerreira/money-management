import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import randomColor from 'randomcolor';

interface Props {
  data: object[],
  onClick: (slicePicked: any) => void
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.1) {
    return;
  }

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export default class TagsPie extends Component<Props> {
  render() {
    const { data, onClick } = this.props;

    return (
      <PieChart width={400} height={500}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
          onClick={onClick}
        >
          {
            data.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry && entry.color ? entry.color : randomColor()} />)
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    )
  }
}
