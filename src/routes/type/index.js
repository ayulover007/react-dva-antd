import React from 'react';
import PropTypes from 'prop-types';
import TypeSearch from './Search';
import TypeList from './List';
import TypeForm from './ModalForm';
import {connect} from 'dva';
import {routerRedux} from "dva/router";

function Type({ location, dispatch, typeManage, loading, modal }) {

  const {field, keyword} = location.query;

  const searchProps = {
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
        type: 'typeManage/showModal',
        payload: {
          type: 'create',
          curItem: {}
        }
      })
    }
  };

  const listProps = {
    typeManage,
    loading,
    location,
    onEdit(data) {
      dispatch({
        type: 'typeManage/showModal',
        payload: {
          type: 'update',
          curItem: data
        }
      })
    },
    onDelete(data) {
      dispatch({
        type: 'typeManage/deleteType',
        payload: data
      })
    },
  };

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.typeId
          ? 'typeManage/update'
          : 'typeManage/create',
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
      <TypeSearch {...searchProps}/>
      <TypeList {...listProps} />
      <TypeForm {...modalProps} />
    </div>
  )
}

Type.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ typeManage, loading, modal }) {
  return { typeManage, modal, loading: loading.models.typeManage }
}

export default connect(mapStateToProps)(Type)
