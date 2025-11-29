import { icons } from "@/constants";
import Image from "next/image";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// local import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/schemas";
import { Lightbulb } from "lucide-react";

const MainComponent = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video_link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/call-supervisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_link: values.video_link }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        setResponse(data.data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="">
      <div className="flex w-full justify-between">
        {/* left */}
        <div className="flex items-center gap-x-[8px] py-[16px] px-[20px] border-b border-b-white/20 w-full">
          <Image
            alt=""
            src={icons.speedometer}
            className="text-white size-[16px] translate-y-px"
          />
          <div className="h-[22px] w-[2px] ml-[20px] mr-[16px] bg-white/20" />
          <p className="font-mona text-[16px] text-white">Dashboard</p>
        </div>

        {/* right */}
        <div>
          <p className=""></p>
        </div>
      </div>

      <div className="mt-[48px]">
        <div className="flex flex-col justify-center items-center">
          <p className="font-pixel whitespace-nowrap text-[40px] text-white">
            LOOK BEFORE YOU LEAP
          </p>
          <p className="font-mona whitespace-nowrap text-[16px] text-white/40">
            Know if the content's correct & trustworthy before consuming it.
          </p>
        </div>
      </div>

      <div className="mt-[60px] flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[820px]"
          >
            <div className="flex items-center gap-4 border border-white/20 rounded-[16px] p-1 bg-black/20">
              <FormField
                control={form.control}
                name="video_link"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Paste the video URL to get started"
                        {...field}
                        autoComplete="off"
                        className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-6 font-mona"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="h-10 w-32 rounded-[12px] bg-white hover:bg-white/90 text-black font-mona font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Lightbulb className="text-black" />
                )}
                {loading ? "Analysing" : "Analyse"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="mx-24 mt-5 h-96 rounded-[12px] bg-[#1a1a1a] border border-white/10 p-6 text-white overflow-hidden flex flex-col">
        {response && (
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-4 border-b border-white/10 pb-6 shrink-0">
              {response.thumbnailUrl && (
                <img
                  src={response.thumbnailUrl}
                  alt={response.title}
                  className="w-32 rounded-lg object-cover aspect-video"
                />
              )}
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold font-mona truncate">
                  {response.title}
                </h2>
                <p className="text-white/60 font-mona text-sm">
                  {response.author}
                </p>
              </div>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-md font-semibold font-mona text-white/80 mb-4 sticky top-0 bg-[#1a1a1a] py-2 z-10">
                Verification Results
              </h3>
              <div className="space-y-3">
                {response.verificationResults?.map(
                  (result: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg bg-black/40 p-4 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex flex-col gap-3">
                        <p className="font-medium text-white/90 text-sm font-mona leading-relaxed">
                          "{result.claim}"
                        </p>

                        <div className="flex">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold ${
                              result.verification_status === "True" ||
                              result.verification_status === "Verified"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : result.verification_status === "False" ||
                                  result.verification_status === "Debunked"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            }`}
                          >
                            {result.verification_status}
                          </span>
                        </div>

                        <div className="h-px w-full bg-white/5" />

                        <p className="text-xs text-white/50 font-mona leading-relaxed">
                          <span className="text-white/70 font-semibold mr-1">
                            Reasoning:
                          </span>
                          {result.explanation}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {!response && !loading && (
          <div className="h-full flex items-center justify-center text-white/20 font-mona">
            unfortunately the deployment is breaking, but the solution works completely fine in local. Please check the repo to test it out! 
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
