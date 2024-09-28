"use client";

import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';

const NewsSection = () => {
    const { Title, Paragraph } = Typography;

    const style = {
        width: '100%',
        height: '400px',
    };

    const titleStyle = { 
        position: 'absolute', 
        top: '100px', 
        left: '100px',
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    const renderLogo = () => {
        return (
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='semi_logo' style={{ width: 87, height: 31 }}/>
        );
    };

    const imgList = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png',
    ];

    const textList = [
        ['2024年CSP认证新闻', 'CSP认证即将开始，请各位考生做好准备。', '发布时间：2024-09-25'],
        ['2023年NOIP资格赛新闻', 'NOIP资格赛即将开始，相关资讯请关注。', '发布时间：2023-12-17'],
        ['2023年NOIP复赛提醒', '复赛即将进行，请考生及时了解赛程。', '发布时间：2023-10-11'],
    ];

    return (
        <div className="bg-white p-8 mb-8 transition-shadow duration-300" style={{ maxWidth: '100%' }}>
            <Carousel 
                style={style} 
                speed={500} 
                animation='fade' 
                theme='dark' 
               
            >
                {
                    imgList.map((src, index) => {
                        return (
                            <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url('${src}')` }}>
                                <Space vertical align='start' spacing='medium' style={titleStyle}>
                                    {renderLogo()}
                                    <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                    <Space vertical align='start'>
                                        <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                        <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                    </Space>
                                </Space>
                            </div>
                        );
                    })
                }
            </Carousel>
        </div>
    );
};

export default NewsSection;