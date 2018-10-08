/**
 * Created by ayulover007 on 2017/7/3.
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim';
import styles from './index.less';

class LogoFooter extends React.Component {

  render() {
    return (
      <QueueAnim>
        <div className="login-footer" key='foot'>如需登录账号或忘记密码，请联系管理员！</div>
      </QueueAnim>
    )
  }

}

export default LogoFooter;
