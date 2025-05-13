import Container from "@/components/ui/container";

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
                    <img src="/assets/img/hero.jpg"
                        alt=""
                        className="w-full h-full object-cover" />

                    <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 text-gray-800 text-sm font-semibold backdrop-blur-md">
                        Abhyasi Interviews &copy;
                    </div>
                    <div className="hidden md:block absolute bottom-4 right-4 w-80 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md">
                        <h2 className="text-neutral-800 font-semibold">Developer</h2>
                        <p className="text-sm text-neutral-600">
                            You can practice coding interviews with AI. It will help you to improve your coding skills and get ready for the real world.
                        </p>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default HomePage;
