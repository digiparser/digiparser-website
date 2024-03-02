import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

export default function CustomEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     sourcePosition,
                                     targetPosition,
                                     style = {},
                                     markerEnd,
                                     data,
                                   }: EdgeProps) {
  const xEqual = sourceX === targetX;
  const yEqual = sourceY === targetY;

  const [edgePath, labelX, labelY] = getBezierPath({
    // we need this little hack in order to display the gradient for a straight line
    sourceX: xEqual ? sourceX + 0.0001 : sourceX,
    sourceY: yEqual ? sourceY + 0.0001 : sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        style={{
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          stroke: "url(#gradient)"
        }}
        markerEnd={markerEnd}
        path={edgePath} 
      />
      {
        data?.label &&
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              padding: '1px 5px',
              borderRadius: 2,
              fontSize: 10,
              fontWeight: 500,
            }}
            className="bg-background nodrag nopan group-hover:block"
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      }
      {
        data?.startLabel &&
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`,
              background: '#e8e8e8',
              padding: '1px 5px',
              borderRadius: 2,
              fontSize: 10,
              fontWeight: 500,
            }}
            className="nodrag nopan"
          >
            {data.startLabel}
          </div>
        </EdgeLabelRenderer>
      }
      {
        data?.endLabel &&
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -100%) translate(${targetX}px,${targetY}px)`,
              background: '#e8e8e8',
              padding: '1px 5px',
              borderRadius: 2,
              fontSize: 10,
              fontWeight: 500,
            }}
            className="nodrag nopan"
          >
            {data.endLabel}
          </div>
        </EdgeLabelRenderer>
      }
    </>
  );
}

// .demo-dot {
//   animation: xAxis 2.5s infinite cubic-bezier(0.02, 0.01, 0.21, 1);
// }
// 
// .demo-dot::after {
//   content: '';
//   display: block;
//   width: 20px;
//   height: 20px;
//   border-radius: 20px;
//   background-color: #fff;
//   animation: yAxis 2.5s infinite cubic-bezier(0.3, 0.27, 0.07, 1.64);
// }
// 
// @keyframes yAxis {
//   50% {
//     animation-timing-function: cubic-bezier(0.02, 0.01, 0.21, 1);
//     transform: translateY(-100px);
//   }
// }
// 
// @keyframes xAxis {
//   50% {
//     animation-timing-function: cubic-bezier(0.3, 0.27, 0.07, 1.64);
//     transform: translateX(100px);
//   }
// }