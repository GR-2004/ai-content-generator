"use client";
import React from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/data/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PROPSINTERFACE {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPSINTERFACE) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const GenerateAIContent = (formData: any) => {
    console.log("hi");
  };
  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
      <Button><ArrowLeft/>Back</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* formSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
        />
        {/* outputSection */}
        <div className="col-span-2">
          <OutputSection />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
