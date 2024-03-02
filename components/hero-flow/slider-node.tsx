import { Position } from 'reactflow';

import Handle from './handle';
import Wrapper from './node-wrapper';

const min = 0;
const max = 40;

export default function SliderNode({ data }: { data: any }) {
  const { label = '', setState = () => {}, zoom = 12 } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
