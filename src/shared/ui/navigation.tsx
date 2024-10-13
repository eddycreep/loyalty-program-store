'use client'

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/context";
import { colors } from "@/utils/colors";
import { usePathname } from 'next/navigation';
import { CalendarClock, LayoutDashboard, X, ListTodo, Blocks, Home, LayoutDashboardIcon, Power } from "lucide-react";


export const Navigation = () => {
  const { user, logout } = useSession();
  const pathname = usePathname();

  const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleVisibility = () => setIsOpen(!isOpen);

    if (!user) return null;
    const { role } = user

    return (
      <div className={`lg:hidden flex relative p-4 ${pathname === '/' ? 'bg-white' : 'bg-black'}`}>
        <div className="w-full items-center justify-between flex">
          <p className="uppercase font-medium text-sm">Store Loyalty</p>
          <LayoutDashboard size={25} strokeWidth={1.5} color={colors?.black} className="cursor-pointer" onClick={toggleVisibility} />
        </div>
        {isOpen &&
          <div className="absolute top-0 left-0 bottom-0 right-0 w-full bg-black-light mx-auto h-screen flex items-center justify-center">
            <div className="bg-white rounded w-11/12 h-1/2 relative flex flex-col items-center justify-center">
              <X size={40} strokeWidth={1.5} color={colors?.red} className="cursor-pointer absolute top-2 right-2" onClick={toggleVisibility} />
              <ul className="flex flex-wrap justify-center gap-8 mb-8">
                {
                  role === 'Admin' &&
                  <li>
                    <Link href='/'><Home size={40} strokeWidth={1.5} color={colors?.black} /></Link>
                  </li>
                }
                <li>
                  <Link href='/dashboard'><LayoutDashboardIcon size={40} strokeWidth={1.5} color={colors?.black} /></Link>
                </li>
                <li>
                  <Link href='/reports'><ListTodo size={40} strokeWidth={1.5} color={colors?.black} /></Link>
                </li>
                <li>
                  <Link href='/admin'><Blocks size={40} strokeWidth={1.5} color={colors?.black} /></Link>
                </li>
              </ul>
              <button className="rounded bg-red text-white p-3" onClick={logout}>
                <X size={24} strokeWidth={1.5} />
              </button>
              <p className="absolute uppercase text-xs w-full text-center bottom-2">Powered by <Link target='__blank' href='https://www.legendsystems.co.za/' className="text-purple">Legend Systems</Link></p>
            </div>
          </div>
        }
      </div>
    )
  }

  const DesktopNavigation = () => {
    if (!user) return null;
    const { role } = user

    return (
      <div className="hidden lg:flex flex-col justify-between gap-1 h-[870px] w-full bg-white rounded py-4 px-2">
        <ul className="flex flex-col gap-4 w-full">
          {
            role === 'Admin' &&
            <li className="flex justify-center">
              <Link href='/' className="p-2 rounded-full hover:bg-gray-100">
                <Home size={30} strokeWidth={1.5} color={pathname === '/' ? colors?.red : colors?.black} />
              </Link>
            </li>
          }
          <li className="flex justify-center">
            <Link href='/dashboard' className="p-2 rounded-full hover:bg-gray-100">
              <LayoutDashboardIcon size={30} strokeWidth={1.5} color={pathname === '/dashboard' ? colors?.red : colors?.black} />
            </Link>
          </li>
          <li className="flex justify-center">
            <Link href='/reports' className="p-2 rounded-full hover:bg-gray-100">
              <ListTodo size={30} strokeWidth={1.5} color={pathname === '/reports' ? colors?.red : colors?.black} />
            </Link>
          </li>
          <li className="flex justify-center">
            <Link href='/admin' className="p-2 rounded-full hover:bg-gray-100">
              <Blocks size={30} strokeWidth={1.5} color={pathname === '/admin' ? colors?.red : colors?.black} />
            </Link>
          </li>
        </ul>
        <button className="gap-2 flex items-center justify-center w-10/12 mx-auto rounded p-2 bg-red text-white" onClick={logout}>
            <span className="text-white font-medium uppercase text-xs">Logout</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  )
}
