"use client";
import React, { useMemo, useState } from 'react';
import { Table, Pagination, Input, Space } from '@douyinfe/semi-ui';
import * as dateFns from 'date-fns';

const ProblemListPage = () => {
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [pageSize, setPageSize] = useState(15);  // 每页显示条数，默认为 15 条
    const [searchTerm, setSearchTerm] = useState('');  // 搜索框的内容

    // 表格列配置：定义每个列的标题和排序功能
    const columns = [
        { 
            title: 'ID', 
            dataIndex: 'id', 
            width: 80, 
            sorter: (a, b) => a.id - b.id // ID 排序
        },  
        { 
            title: '展示ID', 
            dataIndex: 'displayId', 
            width: 150, 
            sorter: (a, b) => a.displayId.localeCompare(b.displayId) // 展示ID 排序
        },  
        { 
            title: '标题', 
            dataIndex: 'name', 
            width: 300, 
            sorter: (a, b) => a.name.localeCompare(b.name) // 标题排序
        },  
        {
            title: '题目类型',
            dataIndex: 'type',
            width: 150,
            sorter: (a, b) => a.type.localeCompare(b.type) // 题目类型排序
        },  
        { 
            title: '作者', 
            dataIndex: 'owner', 
            width: 150, 
            sorter: (a, b) => a.owner.localeCompare(b.owner) // 作者排序
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: 200,
            render: value => dateFns.format(new Date(value), 'yyyy-MM-dd'), // 格式化创建时间
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt) // 创建时间排序
        },
        {
            title: '操作',
            dataIndex: 'actions',
            width: 200,
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button size="small" type="primary" onClick={() => handleEdit(record.id)}>修改</button>
                    <button size="small" type="danger" onClick={() => handleDelete(record.id)}>删除</button>
                    <button size="small" onClick={() => handleDownload(record.id)}>下载</button>
                </div>
            ), // 操作列，包含编辑、删除、下载按钮
        }
    ];

    // 示例数据：创建了 500 条示例数据，用于模拟问题列表
    const data = useMemo(() => {
        const _data = [];
        const DAY = 24 * 60 * 60 * 1000;
        for (let i = 0; i < 500; i++) {
            _data.push({
                key: '' + i,
                id: i + 1,
                displayId: `ID-${i + 1}`,
                name: `题目标题 ${i + 1}`,
                type: i % 2 === 0 ? '公开题目' : '比赛题目',
                owner: `用户 ${i + 1}`,
                createdAt: new Date().valueOf() - i * DAY,
            });
        }
        return _data;
    }, []);

    // 搜索过滤功能：搜索标签时部分匹配即可
    const filteredData = useMemo(() => {
        if (!searchTerm) return data; // 如果没有搜索输入，显示所有数据
        return data.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   item.owner.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, data]);

    // 分页后的数据：根据当前页码和每页条数来切割数据
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, filteredData]);

    // 操作按钮事件：处理编辑、删除、下载操作的回调
    const handleEdit = (id) => {
        console.log(`编辑题目ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`删除题目ID: ${id}`);
    };

    const handleDownload = (id) => {
        console.log(`下载题目ID: ${id}`);
    };

    return (
        <div>
            {/* 搜索框 */}
            <Space align="start" style={{ marginBottom: 16 }}>
                <Input
                    placeholder="搜索题目标签..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}  // 设置输入框的内容并实时更新搜索条件
                    style={{ width: 300 }}
                />
            </Space>

            {/* 表格展示 */}
            <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false} // 分页控制在表格外
                bordered
                scroll={{ y: 700 }}  // 表格内容滚动
                size="middle"
            />

            {/* 分页组件 */}
            <Pagination
                currentPage={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);  // 更新每页显示条数
                }}
                pageSizeOpts={[15, 30, 50, 100]}  // 可选的每页条数选项
                showSizeChanger
                showQuickJumper
                defaultPageSize={15}  // 设置默认显示15条
            />
        </div>
    );
};

export default ProblemListPage;