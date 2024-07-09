"use client";
import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/data/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AIModel";

interface PROPSINTERFACE {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPSINTERFACE) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");

  const GenerateAIContent = async (formData: any) => {
    try {
      setLoading(true);
      const requiredPrompt = selectedTemplate?.aiPrompt;
      const finalPrompt = JSON.stringify(formData) + " " + requiredPrompt;
      const result = await chatSession.sendMessage(finalPrompt);
      if (!result && !result.response) {
        throw new Error(
          "something went wrong while fetching the answer with AI."
        );
      }
      console.log(result.response.text());
      setLoading(false);
      setAiResponse(result.response.text());
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* formSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* outputSection */}
        <div className="col-span-2">
          <OutputSection aiResponse={aiResponse} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
