import { type CSSProperties } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import { cn } from "@/lib/utils";

type HandleComponentProps = {
  id?: string;
  style?: CSSProperties;
  label?: string;
  type: HandleType;
  position: Position;
};

export default function HandleComponent({
  style,
  label,
  position,
  ...props
}: HandleComponentProps) {
  const className = cn('w-[3px] h-[3px] min-w-0 min-h-0 bg-gray-400 border-none', {
    '-left-[2.5px]': position === Position.Left,
    '-right-[2.5px]': position === Position.Right,
    '-bottom-[2.5px]': position === Position.Bottom,
    '-top-[2.5px]': position === Position.Top,
  });

  return <Handle className={className} position={position} {...props} />;
}

export function SmallHandle({
                                          style,
                                          label,
                                          position,
                                          ...props
                                        }: HandleComponentProps) {
  const className = cn('w-[1px] h-[1px] min-w-0 min-h-0 bg-gray-400 border-none', {
    '-left-[2.5px]': position === Position.Left,
    '-right-[2.5px]': position === Position.Right,
    '-bottom-[2.5px]': position === Position.Bottom,
    '-top-[2.5px]': position === Position.Top,
  });

  return <Handle className={className} position={position} {...props} />;
}
