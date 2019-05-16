import React from 'react';
const styles = require('./InstallLayout.less');

class InstallLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.box}>{children}</div>
      </div>
    );
  }
}

export default InstallLayout;
