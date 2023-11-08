import { Sigma } from "lucide-react";

const page = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-8 p-10">
            <Sigma className="h-10 w-10" />
            <h1 className="text-5xl mb-4 font-bold">About Us</h1>
            <p className="text-lg text-center mb-10">This is a simple about page for our application. We are using Tailwind CSS for styling.</p>
            <div className="border-l-2 border-white pl-8">
                <div className="mb-8">
                    <h2 className="text-2xl mb-2">Nov 2023</h2>
                    <p>Launch 🚀</p>
                </div>
            </div>
        </div>
    )
}

export default page;