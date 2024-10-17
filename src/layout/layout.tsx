import { Toaster } from 'react-hot-toast';

//components
// import { Navigation } from '../components/navigation/navigation';
// import { TopBar } from '../components/top-bar/top-bar';
// import { SurveyPortal } from '../components/portals/survey-portal';

export const Layout = ({ children }: any) => {

    return (
        <>
            <div className='h-screen w-full overflow-hidden lg:ease-in-out duration-500 bg-black flex flex-col justify-start lg:justify-between lg:gap-2 lg:p-2'>
                {/* <TopBar /> */}
                <div className='flex items-start justify-between gap-2 w-full lg:h-[90vh] relative'>
                    {/* <SurveyPortal />
                    <Navigation /> */}
                    <main className="w-full lg:w-[96%] h-full border bg-grey lg:rounded overflow-y-hidden">
                        <article className='w-full h-full'>
                            {children}
                        </article>
                    </main>
                </div>
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    className: 'flex items-start justify-center gap-2 text-center'
                }}
            />
        </>
    )
}
