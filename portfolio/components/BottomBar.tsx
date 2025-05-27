export default function BottomBar() {

    const openNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className = "w-full flex bg-kat-black p-4 max-h-20 min-w-screen justify-center  space-x-20 items-center align-middle text-lg md:text-3xl">
                <button onClick={() => openNewTab('/assets/KatherinaDayaon_Resume.pdf')}>
                        <img className="hover:brightness-200 cursor-pointer" src="/assets/resume.svg"></img>
                    </button>
                    <button onClick={() => openNewTab('https://www.linkedin.com/in/katherina-dayaon/')}>
                        <img className="hover:brightness-200 cursor-pointer"src="/assets/linkedIn.svg"></img>
                    </button>
                    <button onClick={() => openNewTab('https://github.com/k4theriina')}>
                        <img className="hover:brightness-200 cursor-pointer" src="/assets/github.svg"></img>
                    </button>
                
        </div>
    );
}