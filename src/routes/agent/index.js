import React from 'react';
import PropTypes from 'prop-types';
import AgentSearch from './Search';
import AgentModal from './ModalForm';
import AllotModal from './AllotCard'
import AgentList from './List';
import {connect} from 'dva';
import {routerRedux} from "dva/router";

function Agent({ location, dispatch, agentManage, loading, modal }) {

  const {field, keyword} = location.query

  const searchProps = {
    agentManage,
    field,
    keyword,
    onSearch(value) {
      const search = {};
      search[value.field] = value.keyword;
      const { pathname } = location;
      if(value.keyword.length) {
        dispatch(routerRedux.push({
          pathname,
          query: {
            ...search
          },
        }));
      } else {
        dispatch(routerRedux.push({pathname}));
      }
    },
    onAdd() {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  };

  const listProps = {
    agentManage,
    loading,
    location,
    onEdit(data) {
      dispatch({
        type: 'agentManage/showModal',
        payload: {
          type: 'update',
          curItem: data
        }
      })
    },
    onDelete(data) {
      dispatch({
        type: 'agentManage/deleteAgent',
        payload: data
      })
    },
    onAllot(record) {
      dispatch({
        type: 'agentManage/showAllotModal',
        payload: record.agentId,
      })
    }
  };

  const allotProps = {
    agentManage,
    loading,
    onOk(data) {
      dispatch({
        type: 'agentManage/allotUpdate',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'agentManage/hideAllotModal'})
    }
  }

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.agentId
          ? 'agentManage/update'
          : 'agentManage/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'modal/hideModal'})
    }
  };


  return (
    <div className="content-inner">
      <AgentSearch {...searchProps} />
      <AgentList {...listProps} />
      <AgentModal {...modalProps} />
      <AllotModal {...allotProps}/>
    </div>
  )
}

Agent.propTypes = {
  systemModifyPwd: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ agentManage, loading, modal }) {
  return { agentManage, modal, loading: loading.models.agentManage }
}

export default connect(mapStateToProps)(Agent)
