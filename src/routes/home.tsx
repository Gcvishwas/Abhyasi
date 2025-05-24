import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import MarqueeImg from "@/components/ui/marquee-img";
import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full pb-24 bg-gray-50 overflow-hidden">
            <Container>
                <div className="my-8">
                    <h2 className="text-3xl text-center md:text-left md:text-6xl">
                        <span className="text-outline font-extrabold md:text-8xl">
                            AI Interviews
                        </span>
                        <span className="text-gray-500 font-extrabold">
                            - Practice Real Scenarios
                        </span>

                        <br />
                        <span className="text-align-left text-2xl md:text-5xl">
                            Get Instant Feedback and build your confidence.
                        </span>
                    </h2>
                    <p className="mt-2 text-center md:text-left text-gray-500 ">
                        Practice interviews to simulate real-world scenarios and prepare effectively.
                        <span className="hidden md:block position:absolute">
                            Engage in interactive mock interviews to refine your responses, enhance communication skills, and gain valuable insights through instant feedback. Whether you're gearing up for technical, behavioral, or situational interviews, this tool is designed to build your confidence and readiness for success.
                        </span>
                    </p>
                </div >

                <div className="flex w-full justify-evenly md:px-12 md:py-12 md:items-center md:justify-end gap-12">
                    <p className="text-3xl font-semibold text-gray-900 text-center">
                        100K+
                        <span className="block text-xl text-muted-foreground font-normal">
                            Offers Received

                        </span>
                    </p>
                    <p className="text-3xl font-semibold text-gray-900 text-center">
                        1.2M+
                        <span className="block text-xl text-muted-foreground font-normal">
                            Interview Taken

                        </span>
                    </p>
                </div>

                {/* Image section */}
                <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow-md relative">
                    <img src="/assets/img/Intervierobot.jpg"
                        alt=""
                        className="w-full h-full absolute top-1 object-fill" />

                    <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 text-gray-800 text-sm font-semibold backdrop-blur-none">
                        Abhyasi Interviews &copy;
                    </div>
                    <div className="md:block absolute bottom-4 md:right-4  w-80 px-4 py-2 rounded-md md:bg-white/70 text-gray-600 text-sm font-serif backdrop-blur-none">
                        <h2 className="hidden md:block text-neutral-800 font-semibold">Developer</h2>
                        <p className="hidden md:block ktext-sm text-neutral-600">
                            You can practice coding interviews with AI. It will help you to improve your coding skills and get ready for the real world.
                        </p>
                        <Link to={"/generate"} className="w-full">
                            <Button className="mt-3">
                                Generate <Sparkles />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>

            {/* marquee section */}

            <div className="w-full mt-8">
                <Marquee pauseOnHover>
                    <MarqueeImg img="/assets/img/logo/firebase.png" />
                    <MarqueeImg img="/assets/img/logo/meet.png" />
                    <MarqueeImg img="/assets/img/logo/microsoft.png" />
                    <MarqueeImg className="h-28 xl:h-28" img="/assets/img/logo/react.png" />
                    <MarqueeImg img="/assets/img/logo/tailwindcss.png" />
                    <MarqueeImg img="/assets/img/logo/zoom.png" />
                </Marquee>
            </div>
            <Container className="py-8 space-y-8">
                <h2 className="tracking-wide text-xl text-gray-800 font-semibold">
                    Start your interview journey with proper insights from AI.
                </h2>
                <div className=" grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-3">
                    <div className="col-span-1 md:col-span-3">
                        <img src="/assets/img/office.jpg"
                            alt=""
                            className="w-full max-h-96 rounded-md object-cover" />
                    </div>

                    <div className=" col-span-1 md:col-span-2 gap-8 md:gap-8 max-h-96 md:min-h-96 flex flex-col items-center justify-center text-center">

                        <p className="text-center text-muted-foreground">
                            Transform the way you prepare, gain confidence, and boost your
                            chances of landing your dream job. Let AI be your edge in
                            today&apos;s competitive job market.
                        </p>

                        <Link to={"/generate"} className="w-full">
                            <Button className="w-3/4">
                                Generate <Sparkles className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;
