import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import { Cookie } from '../../utils'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  agentManage: {
    list,
    pagination
  },
  loading,
  location,
  onEdit,
  onDelete,
  onAllot
}) {


  const columns = [
    {
      title: '登录名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '代理商名',
      dataIndex: 'agentName',
      key: 'agentName'
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    }, {
      title: '邀请码',
      dataIndex: 'invitationCode',
      key: 'invitationCode'
    }, {
      title: '用户类型',
      dataIndex: 'agentType',
      key: 'agentType',
      render: (agentType) => <span>{agentType === 0 ? '管理员' : '代理商'}</span>
    }, {
      title: '日卡余量',
      dataIndex: 'dayCardAvailable',
      key: 'dayCardAvailable'
    }, {
      title: '月卡余量',
      dataIndex: 'monthCardAvailable',
      key: 'monthCardAvailable'
    }, {
      title: '季卡余量',
      dataIndex: 'quarterCardAvailable',
      key: 'quarterCardAvailable'
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status === 0 ? '已禁用': '已启用'}</span>
    }, {
      title: '操作',
      key: 'operation',
      // width: 80,
      render: (text, record) => (
        <span className="buttonGroup">
          <Button type="primary" size="small" onClick={() => onEdit(record)}>修改</Button>
          <Button type="default" size="small" onClick={() => onAllot(record)}>{Cookie.get('agent_type') === '0' ? '分销' : '分配'}</Button>
          <Popover content={(<div><p>微信号：{record.wechatNumber}</p><p>QQ号：{record.qqNumber}</p></div>)} title="更多联系方式" trigger="click">
            <Button size="small">更多联系方式</Button>
          </Popover>
          <Popconfirm title="是否删除？" okText="确认" cancelText="取消" onConfirm = { () => onDelete(record.agentId) }>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>

        </span>
      ),
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.agentId}
    />
  )
}

List.propTypes = {
  agentManage: PropTypes.object.isRequired,
}

export default List
