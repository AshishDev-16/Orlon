import Image from "next/image";


export const Loader = () => {
    return ( 
        <div className="h-full flex flex-col bg-transparent gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                alt="logo"
                width={1000}
                height={1000}
                src="/logo2.png"
                priority={false}
                />
            </div>
            <p className="text-sm text-gray-600">
                Orlon is thinking...
            </p>
        </div>
     );
}
 
 