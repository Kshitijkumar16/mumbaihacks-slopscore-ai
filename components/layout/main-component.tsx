import { icons } from "@/constants";
import Image from "next/image";

const MainComponent = () => {
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

      <div className="mt-[60px] flex justify-between">
        <div className="">
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="video_link"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="p-text placeholder:p-text mt-8 h-12 max-w-[440px] bg-white/80 font-semibold text-black placeholder:text-black/50 focus:ring-0">
                      <Input
                        placeholder="https://youtube.com/..."
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-arancia hover:text-arancia border-arancia h-11 w-64 cursor-pointer border text-white hover:bg-white active:bg-black"
              >
                <p className="p-text font-semibold">Analyse</p>
              </Button>
            </form>
          </Form> */}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
