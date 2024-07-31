"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface outputSectionInterface {
  aiResponse: string | undefined;
}

const OutputSection = ({ aiResponse }: outputSectionInterface) => {
  const editorRef: any = useRef();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (aiResponse) setValue(aiResponse);
  }, [aiResponse]);
  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button
          className="flex gap-2"
          onClick={() =>
            aiResponse && navigator.clipboard.writeText(aiResponse)
          }
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        style={{ height: "600px" }}
      />
    </div>
  );
};

export default OutputSection;
