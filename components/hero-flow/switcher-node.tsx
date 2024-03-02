import { useCallback } from 'react';
import { Position } from 'reactflow';

import Handle from './handle';
import Wrapper from './node-wrapper';

const options = ['cube', 'pyramid'];

export default function SwitcherNode({ data }: { data: any }) {
  const { label = '', setState = () => {}, shape } = data;

  const onValueChange = useCallback((val: string) => {
    setState((state: any) => ({ ...state, shape: val }));
  }, []);

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
}
