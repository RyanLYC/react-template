import * as React from 'react';
import image from '@/assets/images/1.jpeg';
import './index.less';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      hello Ryan lyc 测试代码提交
      <img src={image} width={200} height={100} />
    </div>
  );
};

export default App;
