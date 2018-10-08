import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  typeManage: {
    list,
    pagination
  },
  loading,
  location,
  onEdit,
  onDelete
}) {


  const columns = [
    {
      title: '分类名',
      dataIndex: 'typeName',
      key: 'typeName'
    },
    {
      title: '上级分类',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (text) => {
        if (text === null) {
          return '无';
        } else {
          return text;
        }
      }
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight'
    },
    {
      title: '状态',
      dataIndex: 'typeStatus',
      key: 'typeStatus',
      render: (text) => {
        if(text === 0) {
          return '未启用';
        } else if(text === 1) {
          return '已启用'
        }
      }
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small" style={{marginRight: '10px'}} onClick={ () => onEdit(record) }>编辑</Button>
          <Popconfirm title="是否删除？" okText="确认" cancelText="取消" onConfirm = { () => onDelete(record.typeId) }>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.typeId}
    />
  )
}

List.propTypes = {
}

export default List
