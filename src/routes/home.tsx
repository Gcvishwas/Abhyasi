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
                </div>
            </Container>
        </div>
    );
};

export default HomePage;
