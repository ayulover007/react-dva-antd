import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  saleManage: {
    list,
    pagination
  },
  loading,
  location,
  onEdit
}) {


  const columns = [
    {
      title: '代理商名',
      dataIndex: 'agentName',
      key: 'agentName'
    }, {
      title: '发放数量',
      dataIndex: 'saleNumber',
      key: 'saleNumber'
    }, {
      title: '状态',
      dataIndex: 'saleStatus',
      key: 'saleStatus',
      render: (text) => {
        if(text === 0) {
          return '未支付';
        } else if(text === 1) {
          return '已支付'
        }
      }
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    }, {
      title: '总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice'
    }, {
      title: '销售时间',
      dataIndex: 'saleDate',
      key: 'saleDate'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Button size="small" type="primary" onClick={() => onEdit(record)}>修改</Button>
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
      rowKey={record => record.saleId}
    />
  )
}

List.propTypes = {
}

export default List
