import { Head, Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import ShinyButton from "@/Components/magicui/shiny-button";
import WordPullUp from "@/Components/magicui/word-pull-up";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className=""
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <WordPullUp
                                words="The Housing Support Stack"
                                className="leading-1 md:text-5xl"
                            />
                            <p className="mt-6 text-center text-lg leading-8 text-gray-600">
                                Seamlessly upload, notify, and adjust surveys
                                with an intuitive user experience
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button asChild>
                                    <Link href={route("register")}>
                                        Get Started
                                    </Link>
                                </Button>
                                <ShinyButton text="Login" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
