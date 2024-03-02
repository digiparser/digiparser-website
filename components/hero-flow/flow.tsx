'use client'

import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background, ControlButton,
  Controls,
  getRectOfNodes, MarkerType,
  Position,
  ReactFlowProvider,
  ReactFlowState,
  useReactFlow,
  useStore,
  useStoreApi,
} from 'reactflow';

import AirtableIcon from "../../public/img/icons/airtable.png";
import DriveIcon from "../../public/img/icons/drive.png";
import GmailIcon from "../../public/img/icons/gmail.png";

import QuickbooksIcon from "../../public/img/icons/quickbooks.png";
import ExcelIcon from "../../public/img/icons/excel.png";
import SalesforceIcon from "../../public/img/icons/salesforce.png";
import WebhookIcon from "../../public/img/icons/webhook.png";

import PreProcessingIcon from "../../public/img/icons/preprocessing.png";
import PostProcessingIcon from "../../public/img/icons/postprocessing.png";
import ReviewerIcon from "../../public/img/icons/reviewer.jpg";
import ParserIcon from "../../public/img/icons/digiparser.png";

import Image from "next/image";
import Handle, { SmallHandle } from "@/components/hero-flow/handle";
import CustomEdge from './customEdge';

const proOptions = {
  hideAttribution: true,
};

type FlowProps = {
  initialColor?: string;
  className?: string;
};


const InputNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
    {
      data.labelComponent ? data.labelComponent : <p>{data.label}</p>
    }
    <Handle type="source" position={Position.Right}/>
  </div>
);

const OutputNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
    {
      data.labelComponent ? data.labelComponent : <p>{data.label}</p>
    }
    <Handle type="target" position={Position.Left}/>
  </div>
);


const AiParserNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'group text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
    <Handle type="target" position={Position.Left}/>
    <Handle type="source" position={Position.Right}/>
    <SmallHandle type="source" id={'bottomParser'} position={Position.Bottom}/>
  </div>
);

const PreProcessingNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'group text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px'}}/>
    <Handle type="target" position={Position.Left}/>
    <Handle type="source" position={Position.Right}/>
    <SmallHandle type="source" id={'bottomPre'} position={Position.Bottom}/>
  </div>
);

const PostProcessingNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'group text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px'}}/>
    <Handle type="target" position={Position.Left}/>
    <Handle type="source" position={Position.Right}/>
    <SmallHandle type="source" id={'bottomPost'} position={Position.Bottom}/>
  </div>
);

const ReviewerNode = ({data}) => (
  <div style={{width: 50, height: 50}} className={'group text-foreground'}>
    <Image src={data.icon} alt={data.label} width={50} height={50}
           style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
    <Handle type="target" position={Position.Left}/>
    <Handle type="source" position={Position.Right}/>
    <SmallHandle type="source" id={'bottomReviewer'} position={Position.Bottom}/>
  </div>
);

const DescriptionNode = ({data}) => (
  <div className={'group text-foreground'} style={{width: 1, height: 1}}>
    {data.labelComponent}
    <SmallHandle type="target" position={Position.Top}/>
  </div>
);

const ParserDescription = () => {
  return (
    <div
      className="w-[170px] absolute left-[50%] translate-x-[-50%] top-[140%] rounded-sm border bg-background text-card-foreground shadow-sm group-hover:block"
      data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-1 pb-0">
        <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">DigiParser AI</h3>
      </div>
      <div className="p-1">
        <p className="text-xs/relaxed">- Data Capture with OCR</p>
        <p className="text-xs/relaxed">- Doc Classification</p>
        <p className="text-xs/relaxed">- Data Extraction</p>
        <p className="text-xs/relaxed">- Template Based Extraction</p>
      </div>
    </div>
  );
};

const PreProcessingDescription = () => {
  return (
    <div
      className="w-[120px] absolute left-[50%] translate-x-[-50%] top-[140%] rounded-sm border bg-background text-card-foreground shadow-sm group-hover:block"
      data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-1 pb-0">
        <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">Pre Processing</h3>
      </div>
      <div className="p-1">
        <p className="text-xs/relaxed">- Filter Documents</p>
        <p className="text-xs/relaxed">- Filter Emails</p>
        <p className="text-xs/relaxed">- Image Auto-crop</p>
        <p className="text-xs/relaxed">- Noise Reduction</p>
      </div>
    </div>
  );
};

const PostProcessingDescription = () => {
  return (
    <div
      className="w-[130px] absolute left-[50%] translate-x-[-50%] top-[140%] rounded-sm border bg-background text-card-foreground shadow-sm group-hover:block"
      data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-1 pb-0">
        <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">Post Processing</h3>
      </div>
      <div className="p-1">
        <p className="text-xs/relaxed">- Data Validation</p>
        <p className="text-xs/relaxed">- Enhance Data</p>
        <p className="text-xs/relaxed">- Data lookup in DB</p>
        <p className="text-xs/relaxed">- Math Operations</p>
      </div>
    </div>
  );
};

const ReviewerDescription = () => {
  return (
    <div
      className="w-[160px] absolute left-[50%] translate-x-[-50%] top-[140%] rounded-sm border text-card-foreground shadow-sm bg-background group-hover:block"
      data-v0-t="card">
      <div className="flex flex-col space-y-1.5 p-1 pb-0">
        <h3 className="text-sm font-semibold whitespace-nowrap leading-none tracking-tight">Human-in-the-loop</h3>
      </div>
      <div className="p-1">
        <p className="text-xs/relaxed">- Confidence Based Rules</p>
        <p className="text-xs/relaxed">- Human Verification</p>
        <p className="text-xs/relaxed">- Review in Slack</p>
        <p className="text-xs/relaxed">- Manually Modify Data</p>
      </div>
    </div>
  );
};

const nodeTypes = {
  input: InputNode,
  aiParser: AiParserNode,
  preProcessing: PreProcessingNode,
  postProcessing: PostProcessingNode,
  reviewer: ReviewerNode,
  output: OutputNode,
  description: DescriptionNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  type: 'custom',
  markerEnd: 'edge-circle',
  animated: true,
  opacity: 0,
};

const descriptionEdgeOptions = {
  type: 'description',
  markerStart: {
    type: MarkerType.Arrow,
  },
  // animated: true,
  opacity: 0,
  style: {
    stroke: "#dfdfe1"
  }
};

const initialEdges = [
  {id: 'gmail-preProcessing', source: 'inputGmail', target: 'preProcessing', data: {label: 'New email'}, ...defaultEdgeOptions},
  {id: 'drive-preProcessing', source: 'inputDrive', target: 'preProcessing', data: {label: 'New file'}, ...defaultEdgeOptions},
  {id: 'airtable-preProcessing', source: 'inputAirtable', target: 'preProcessing', data: {label: 'New entry'}, ...defaultEdgeOptions},

  {id: 'preProcessing-description', source: 'preProcessing', target: 'preProcessingDescription', ...descriptionEdgeOptions, sourceHandle: 'bottomPre'},

  {id: 'preProcessing-aiParser', source: 'preProcessing', target: 'aiParser', data: {label: 'Filtered documents'}, ...defaultEdgeOptions},
  {id: 'aiParser-description', source: 'aiParser', target: 'aiParserDescription', ...descriptionEdgeOptions, sourceHandle: 'bottomParser'},

  {id: 'aiParser-postProcessing', source: 'aiParser', target: 'postProcessing', data: {label: 'Extracted Data'}, ...defaultEdgeOptions},
  {id: 'postProcessing-description', source: 'postProcessing', target: 'postProcessingDescription', ...descriptionEdgeOptions, sourceHandle: 'bottomPost'},

  {id: 'postProcessing-reviewer', source: 'postProcessing', target: 'reviewer', data: {label: 'Structured Data'}, ...defaultEdgeOptions},
  {id: 'reviewer-description', source: 'reviewer', target: 'reviewerDescription', ...descriptionEdgeOptions, sourceHandle: 'bottomReviewer'},

  {id: 'reviewer-excel', source: 'reviewer', target: 'outputExcel', data: {label: 'Export to Excel'}, ...defaultEdgeOptions},
  {id: 'reviewer-webhook', source: 'reviewer', target: 'outputWebhook', data: {label: 'Send to Webhook'}, ...defaultEdgeOptions},
  {id: 'reviewer-salesforce', source: 'reviewer', target: 'outputSalesforce', data: {label: 'Export to Salesforce'}, ...defaultEdgeOptions},
  {id: 'reviewer-quickbooks', source: 'reviewer', target: 'outputQuickbooks', data: {label: 'Export to Quickbooks'}, ...defaultEdgeOptions},
];


const viewportWidthSelector = (state: ReactFlowState) => state.width;

function Flow({className}: FlowProps) {

  const {getNodes, setNodes, setEdges, setViewport} = useReactFlow();
  const viewportWidth = useStore(viewportWidthSelector);
  
  const store = useStoreApi();
  const availableWidth = (viewportWidth || 1440) - 200;

  const initialNodes = [
    {
      id: 'inputGmail',
      type: 'input',
      data: {label: 'Email', icon: GmailIcon},
      position: {x: 0, y: 0},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
    {
      id: 'inputDrive',
      type: 'input',
      data: {label: 'Drive', icon: DriveIcon},
      position: {x: 0, y: 150},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
    {
      id: 'inputAirtable',
      type: 'input',
      data: {label: 'Airtable', icon: AirtableIcon},
      position: {x: 0, y: 300},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },

    {
      id: 'preProcessing',
      type: 'preProcessing',
      data: {label: 'Pre Processing', icon: PreProcessingIcon},
      position: {x: availableWidth * 0.2, y: 145},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'border-0',
      style: { opacity: 0 },
    },
    {
      id: 'preProcessingDescription',
      type: 'description',
      data: {labelComponent: <PreProcessingDescription />},
      position: {x: availableWidth * 0.22, y: 400},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      className: 'border-0',
      style: { opacity: 0 },
    },

    {
      id: 'aiParser',
      type: 'aiParser',
      data: {label: 'DigiParser', icon: ParserIcon},
      position: {x: availableWidth * 0.35, y: 207},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'border-0',
      style: {opacity: 0},
    },
    {
      id: 'aiParserDescription',
      type: 'description',
      data: {labelComponent: <ParserDescription />},
      position: {x: availableWidth * 0.37, y: 400},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      className: 'border-0',
      style: {opacity: 0},
    },

    {
      id: 'postProcessing',
      type: 'postProcessing',
      data: {label: 'Post Processing', icon: PostProcessingIcon},
      position: {x: availableWidth * 0.55, y: 210},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'border-0',
      style: {opacity: 0},
    },
    {
      id: 'postProcessingDescription',
      type: 'description',
      data: {labelComponent: <PostProcessingDescription />},
      position: {x: availableWidth * 0.57, y: 400},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      className: 'border-0',
      style: {opacity: 0},
    },

    {
      id: 'reviewer',
      type: 'reviewer',
      data: {label: 'Reviewer', icon: ReviewerIcon},
      position: {x: availableWidth * 0.70, y: 155},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'border-0',
      style: {opacity: 0},
    },
    {
      id: 'reviewerDescription',
      type: 'description',
      data: {labelComponent: <ReviewerDescription />},
      position: {x: availableWidth * 0.72, y: 400},
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      className: 'border-0',
      style: {opacity: 0},
    },

    {
      id: 'outputExcel',
      type: 'output',
      data: {label: 'Excel', icon: ExcelIcon},
      position: {x: availableWidth, y: 0},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
    {
      id: 'outputWebhook',
      type: 'output',
      data: {label: 'Webhook', icon: WebhookIcon},
      position: {x: availableWidth, y: 120},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
    {
      id: 'outputSalesforce',
      type: 'output',
      data: {label: 'Salesforce', icon: SalesforceIcon},
      position: {x: availableWidth, y: 250},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
    {
      id: 'outputQuickbooks',
      type: 'output',
      data: {label: 'Quickbooks', icon: QuickbooksIcon},
      position: {x: availableWidth, y: 360},
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      className: 'w-[50px] h-[50px] p-0 border-0',
      style: { opacity: 0 },
    },
  ];

  const adjustViewport = useCallback(() => {
    const nodes = getNodes();
    const {width, height} = store.getState();
    const {
      x: xMin,
      y: yMin,
      width: xMax,
      height: yMax,
    } = getRectOfNodes(nodes);

    // const zoom = width < 1240 ? (width < 768 ? 0.35 : 0.6) : 1;
    // const tablet = width <= 1024;
    // const mobileView = width <= 768;
    // const flowWidth = (xMax - xMin) * zoom;
    // const flowHeight = (yMax - yMin) * zoom;
    // const navWidth = Math.min(width - 70, 1200);
    
    let viewportX;
    let viewportY;
    
    switch (true) {
      case width <= 500:
        viewportX = 10;
        viewportY = 30;
        break;
      case width <= 768:
        viewportX = 20;
        viewportY = 10;
        break;
      case width <= 1024:
        viewportX = 20;
        viewportY = 0;
        break;
      case width <= 1240:
        viewportX = 20;
        viewportY = 50;
        break;
      default:
        viewportX = 100;
        viewportY = 40;
    }

    let zoom = (width - (viewportX * 2)) / xMax;

    zoom = zoom > 1 ? 1 : zoom;

    console.log({xMin, xMax, yMin, yMax, width, height, zoom, viewportX, viewportY});

    setViewport({x: viewportX, y: viewportY, zoom});
  }, [setViewport, getNodes, store]);

  const onInit = useCallback(() => {
    adjustViewport();
    setNodes((nds) =>
      nds.map((n) => ({...n, style: {...n.style, opacity: 1}})),
    );
    setEdges((eds) =>
      eds.map((e) => ({...e, style: {...e.style, opacity: 1}})),
    );
  }, [setViewport, getNodes, store]);

  useEffect(() => {
    adjustViewport();
  }, [viewportWidth]);


  return (
    <div className="w-full h-full bg-gradient bg-no-repeat bg-[center_120px] lg:bg-[65%_center] lg:bg-[length:35%]">
      <ReactFlow
        id="hero"
        preventScrolling={false}
        zoomOnScroll={false}
        panOnDrag={true}
        snapToGrid={true}
        nodesDraggable={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={proOptions}
        className={className}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        onInit={onInit}
        minZoom={0.25}
        maxZoom={1}
      >
        {/*<Background className={'opacity-30'} color={'#8a8a8a'}/>*/}
        <svg>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(253,29,29,1)"/>
              <stop offset="100%" stopColor="rgba(131,58,180,1)"/>
            </linearGradient>
          </defs>
        </svg>
        <Controls showFitView={false} showInteractive={false} fitViewOptions={{
          minZoom: 0.2,
          maxZoom: 1
        }} className={'bg-white'} />
      </ReactFlow>
    </div>
  );
}

export default function Wrapper(props: FlowProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
