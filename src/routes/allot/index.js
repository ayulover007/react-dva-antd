import React from 'react';
import PropTypes from 'prop-types';
import SaleList from './List';
import {connect} from 'dva';

function Allot({ location, dispatch, allotManage, loading, modal }) {

  const listProps = {
    allotManage,
    loading,
    location,
  };

  return (
    <div className="content-inner">
      <SaleList {...listProps} />
    </div>
  )
}

Allot.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ allotManage, loading, modal }) {
  return { allotManage, modal, loading: loading.models.saleManage }
}

export default connect(mapStateToProps)(Allot)
