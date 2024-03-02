import { memo } from 'react';
import { Position } from 'reactflow';

import Handle from './handle';
import Wrapper from './node-wrapper';

// eslint-disable-next-line react/display-name
export default memo(({ data }: { data: any }) => {
  const { label = '', setState = () => {}, color = '#000', value } = data;

  return (
    <Wrapper label={label}>
      <div className="flex items-center space-x-2">
        <input
          className="nodrag border-md w-6 h-6"
          type="color"
          onChange={(evt) =>
            setState((state: any) => ({ ...state, color: evt.target.value }))
          }
          defaultValue={color}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
});
