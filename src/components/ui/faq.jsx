"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";

export default function FaqSection({ data }) {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div
      className="mx-auto max-w-md rounded-lg bg-black p-4"
      style={{ maxWidth: "700px", minWidth: "700px" }}
    >
      <div className="mb-4 text-lg text-white">simplyfy</div>

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {Object.entries(data).map(([question, answer], index) => (
          <Accordion.Item value={index.toString()} key={index} className="mb-2">
            <Accordion.Header>
              <Accordion.Trigger
                className="flex w-full items-center justify-start gap-x-4"
                style={{ width: "100%" }}
              >
                <div
                  className="relative flex items-center space-x-2 rounded-xl bg-bla p-2 hover:bg-[#255a61]"
                  style={{
                    backgroundColor: openItem === index.toString() ? "#255a61" : "",
                  }}
                >
                  <span className="font-medium text-4xl text-white">{question}</span>
                </div>

                <span className="cursor-pointer text-lg font-bold text-gray-400">
                  {openItem === index.toString() ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#7CB9E8"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount style={{ display: "block" }}>
              <motion.div
                initial="collapsed"
                animate={openItem === index.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", overflow: "hidden" }}
              >
                <div
                  className="ml-7 mt-1 rounded-lg p-3 text-white md:ml-16"
                  style={{
                    borderRadius: "12px",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div className="relative max-w-xs rounded-2xl bg-blue-500 px-4 py-2 text-white">
                    {answer}
                    <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[10px] border-t-[10px] border-l-transparent border-t-blue-500"></div>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
