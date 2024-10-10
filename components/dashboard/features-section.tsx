"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { YoutubeIcon } from "lucide-react";
// @ts-ignore
import Player from 'next-video/player';
// @ts-ignore
import BackgroundPlayer from 'next-video/background-player';

// const Player = dynamic(() => import('next-video/player') as any, { ssr: false });
// const BackgroundPlayer = dynamic(() => import('next-video/background-player') as any, { ssr: false });

export default function FeaturesSection() {
  const features = [
    {
      title: "Visualize Your Data",
      description: (
        <>
          <p>
            {`DigiParser can parse any document formats including images, PDFs, scanned documents, and more. It then visualizes the extracted data, allowing for faster review and approval.`}
          </p>
          <p>{`DigiParser supports all document types, including:`}</p>
          <ul>
            <li>Invoices</li>
            <li>Resumes</li>
            <li>Contracts</li>
            <li>Receipts</li>
            <li>Expense reports</li>
            <li>Driver license</li>
            <li>Passport</li>
            <li>ID Card</li>
            <li>Custom documents</li>
          </ul>
        </>
      ),
      videoSrc: "/videos/data-visualization-demo.mp4",
      videoHdSrc: "/videos/data-visualization-demo.mp4",
    },
    {
      title: "Customize Extraction Schema",
      description: (
        <>
          <p>{`Tailor DigiParser to your specific data extraction needs. Define custom extraction schemas based on the data types present in your documents, ensuring you capture exactly what you need.`}</p>
          <p>{`Supported data types include:`}</p>
          <ul>
            <li>String</li>
            <li>Number</li>
            <li>Money</li>
            <li>Currency</li>
            <li>Address</li>
            <li>Datetime</li>
            <li>Tables</li>
          </ul>
        </>
      ),
      videoSrc: "/videos/schema-customization-demo.mp4",
      videoHdSrc: "/videos/schema-customization-demo.mp4",
    },
    {
      title: "Automate Your Workflow",
      description: (
        <>
          <p>{`Streamline repetitive tasks by automating your document workflows. DigiParser integrates with your favorite tools, allowing you to set up end-to-end automation for document processing, approval, and data export.`}</p>
          <p>{`Workflow automation steps include:`}</p>
          <ul>
            <li>Import - import documents into your parser</li>
            <li>Process - parse data from documents</li>
            <li>Manipulate - manipulate extracted data</li>
            <li>Output - customize output structure</li>
            <li>Review - add review stages</li>
            <li>Export - export data to your preferred tools</li>
          </ul>
        </>
      ),
      videoSrc: "/videos/workflow-automation-demo.mp4",
      videoHdSrc: "/videos/workflow-automation-demo.mp4",
    },
  ];


  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8 mb-16">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Packed with essential features
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          From custom data extraction to seamless workflow automation, DigiParser is equipped with advanced features to streamline every aspect of your document processing, making your business more efficient.
        </p>
      </div>


      <div className="space-y-24">
        {features.map((feature, index) => (
          <FeatureRow
            key={feature.title}
            title={feature.title}
            description={feature.description}
            videoSrc={feature.videoSrc}
            videoHdSrc={feature.videoHdSrc}
            reverse={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}

const FeatureRow = ({ title, description, videoSrc, videoHdSrc, reverse }) => {
  const contentOrder = reverse ? "order-2" : "order-1";
  const videoOrder = reverse ? "order-1" : "order-2";

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 px-8">
      <div className={`w-full lg:w-1/3 ${contentOrder}`}>
        <h3 className="text-2xl lg:text-3xl font-medium text-black dark:text-white mb-4">
          {title}
        </h3>
        <div className="text-sm lg:text-base text-neutral-500 dark:text-neutral-300 space-y-4">
          {React.Children.map(description.props.children, (child, index) => {
            if (child.type === 'p') {
              return <p key={index}>{child.props.children}</p>;
            } else if (child.type === 'ul') {
              return (
                <ul key={index} className="list-disc pl-5 space-y-2">
                  {child.props.children.map((li, liIndex) => (
                    <li key={liIndex} className="ml-2">{li.props.children}</li>
                  ))}
                </ul>
              );
            }
            return child;
          })}
        </div>
      </div>
      <div className={`w-full lg:w-2/3 ${videoOrder}`}>
        <VideoEmbed src={videoSrc} hdSrc={videoHdSrc} />
      </div>
    </div>
  );
};

const VideoEmbed = ({ src, hdSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative">
      <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-[6px_8px_15px_9px_#a4a4a4] dark:shadow-[6px_8px_15px_9px_#171717]">
        {/* macOS-style top bar */}
        <div className="bg-gray-200 dark:bg-gray-700 h-6 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Video player */}
        <div className="relative aspect-video">
          {isPlaying ? (
            <Player src={hdSrc} autoPlay={true} />
          ) : (
            <BackgroundPlayer src={src}>
              <div>
                <YoutubeIcon
                  className="cursor-pointer h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto"
                  onClick={() => setIsPlaying(true)}
                />
              </div>
            </BackgroundPlayer>
          )}
        </div>
      </div>
    </div>
  );
};
