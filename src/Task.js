import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Task() {

  // define all states
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  // define useEffect 
  useEffect(() => {
    fetchData();
  }, []);

  // fetch data from API
  const fetchData = async () => {
    try {
      const responseX = await axios.get('https://retoolapi.dev/gDa8uC/data');
      const responseY = await axios.get('https://retoolapi.dev/o5zMs5/data');
      setXData(responseX.data.slice(0, 50));
      setYData(responseY.data.slice(0, 50));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Combined data 
  const combinedData = xData.map((item, index) => ({
    x: parseFloat(item.RandomNumber),
    y: parseFloat(yData[index].RandomNumber)
  }));

  return (
    <div className='containerSection'>
      <h1 className='chartHeaderHeading'>Task</h1>
      <ResponsiveContainer>
        <ScatterChart className='chartHeader'>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" />
          <YAxis type="number" dataKey="y" name="y" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Data" data={combinedData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Task;
