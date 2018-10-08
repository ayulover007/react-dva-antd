import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import LoginForm from './LoginForm'
import LogoGather from '../../components/LogoAnim/index';
import LogoFooter from '../../components/LogoFooter/index';
import styles from './LoginForm.less'
import { Spin } from 'antd'

function Login ({ dispatch, loading = false }) {
  const loginProps = {
    loading,
    onOk (data) {
      dispatch({type: 'app/login', payload: data})
    }
  }
  return (
    <div className={styles.spin} style={{height: '100%'}}><LogoGather/><LogoFooter/><Spin tip='加载用户信息...' spinning={loading} size='large'><LoginForm {...loginProps} /></Spin></div>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

function mapStateToProps({ loading }) {
  return { loading: loading.models.app }
}

export default connect(mapStateToProps)(Login)