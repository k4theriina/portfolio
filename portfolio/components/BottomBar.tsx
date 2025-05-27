export default function BottomBar() {
    return (
        <div className = "w-full flex bg-kat-black p-4 max-h-20 min-w-100 justify-center space-x-20 items-center align-middle text-lg md:text-3xl">
                <button>
                    <img className="hover:brightness-200 cursor-pointer"src="/assets/linkedIn.svg"></img>
                </button>
                <button>
                    <img className="hover:brightness-200 cursor-pointer" src="/assets/github.svg"></img>
                </button>
                <button>
                    <img className="hover:brightness-200 cursor-pointer" src="/assets/resume.svg"></img>
                </button>
                
        </div>
    );
}