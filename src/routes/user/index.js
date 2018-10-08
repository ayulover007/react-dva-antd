import React from 'react';
import PropTypes from 'prop-types';
import UserSearch from './Search';
import UserList from './List';
import {connect} from 'dva';
import {routerRedux} from "dva/router";

function User({ location, dispatch, userManage, loading, modal }) {

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
        type: 'modal/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  };

  const listProps = {
    userManage,
    loading,
    location,
    onReset(data) {
      dispatch({
        type: 'userManage/resetPassword',
        payload: data
      })
    }
  };

  return (
    <div className="content-inner">
      <UserSearch {...searchProps}/>
      <UserList {...listProps} />
    </div>
  )
}

User.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ userManage, loading, modal }) {
  return { userManage, modal, loading: loading.models.userManage }
}

export default connect(mapStateToProps)(User)
