"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateList";
import Templates from "@/data/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AIModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment"
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

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
  const {user} = useUser()
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);
  const router = useRouter();
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);  
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);  



  const GenerateAIContent = async (formData: any) => {
    try {
      if(totalUsage >= 10000 && !userSubscription){
        console.log("please upgrade your existing plan")
        router.push("/billing")
        return;
      }
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
      setAiResponse(result?.response.text());
      await saveInDB(formData, selectedTemplate?.slug, result?.response.text())
      setUpdateCreditUsage(Date.now())
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const saveInDB = async(formData:any, slug:any, aiResponse:any) => {
    const result = await db.insert(AIOutput).values({
      formData:formData,
      templateSlug: slug,
      aiResponse: aiResponse,
      createdAt: moment().format("DD-MM-yyyy"),
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
    })
    console.log(result);
  }

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
