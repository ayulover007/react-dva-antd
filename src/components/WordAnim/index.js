/**
 * Created by ayulover007 on 2017/7/3.
 */
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import styles from './index.less';

class WordAnim extends React.Component {

  render() {
    return (
      <QueueAnim delay={300} className="queue-simple">
        <div key="a">告别繁琐</div>
        <div key="b" className="second-queue">轻快检测</div>
      </QueueAnim>
    );
  }
}

export default WordAnim;
