import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/hammer.svg" alt="logo" width={30} height={30} />
                    <span className="text-lg font-semibold">DevForge</span>
                </Link>


                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                        <div className="flex items-center gap-x-4">
                            <Link href="/startup/create" className="flex items-center">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                    
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}
                                className="flex items-center"
                            >
                                <button type="submit" className="flex items-center">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                    
                            <Link href={`/user/${session?.id}`} className="flex items-center">
                                <Avatar className="size-10">
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </>
                    
                    ) : (
                        <form
                            action={async () => {
                                "use server";

                                await signIn("github");
                            }}
                        >
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;