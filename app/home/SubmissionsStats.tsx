"use client";
import React from 'react';
import ReactECharts from 'echarts-for-react';  // 引入 echarts-for-react
import { format, subDays } from 'date-fns';   // 使用 date-fns 来生成最近七天的日期

const SubmissionsStats = () => {
  // 生成最近七天的日期，只显示月日
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'MM-dd'));

  // 示例数据
  const submissionsData = [12, 19, 3, 5, 2, 3, 7];  // 通过数
  const totalSubmissionsData = [20, 25, 10, 12, 8, 10, 15];  // 提交总数

  const option = {
    title: {
      text: '最近一周提交统计',
      textStyle: {
        fontSize: 20,
        fontFamily: 'Helvetica',
        color: '#4A5568',
      },
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['通过数', '提交总数'],
      top: '10%',  // 将图例放置在标题下方
      textStyle: {
        fontSize: 14,
        fontFamily: 'Helvetica',
        color: '#4A5568',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: daysOfWeek,  // 使用生成的最近七天的日期
        axisLabel: {
          fontSize: 14,
          fontFamily: 'Helvetica',
          color: '#4A5568',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 14,
          fontFamily: 'Helvetica',
          color: '#4A5568',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(200, 200, 200, 0.2)',
          },
        },
      },
    ],
    series: [
      {
        name: '通过数',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        emphasis: {
          focus: 'series',
        },
        data: submissionsData,  // 使用示例数据
        lineStyle: {
          width: 2,
          color: '#66ccff',  // 小清新的浅蓝色
        },
        itemStyle: {
          color: '#66ccff',
        },
        label: {
          show: true,
          position: 'top',  // 显示折线对应的值
          color: '#333',
        },
        smooth: true,  // 平滑曲线
      },
      {
        name: '提交总数',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: {} },
        emphasis: {
          focus: 'series',
        },
        data: totalSubmissionsData,  // 使用示例数据
        lineStyle: {
          width: 2,
          color: '#ffcc99',  // 小清新的浅橙色
        },
        itemStyle: {
          color: '#ffcc99',
        },
        label: {
          show: true,
          position: 'top',  // 显示折线对应的值
          color: '#333',
        },
        smooth: true,  // 平滑曲线
      },
    ],
  };

  return (
    <div className="bg-white hover:bg-gray-100 rounded-lg shadow-lg p-8 mb-8 transition-shadow duration-300">
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default SubmissionsStats;