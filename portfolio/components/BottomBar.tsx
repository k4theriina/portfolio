export default function BottomBar() {
    return (
        <div className = "w-full flex bg-kat-black p-4 max-h-20 min-w-100 justify-center space-x-20 items-center align-middle text-lg md:text-3xl">
                <button>
                    <img src="/assets/linkedIn.svg"></img>
                </button>
                <button>
                    <img src="/assets/github.svg"></img>
                </button>
                <button>
                    <img src="/assets/resume.svg"></img>
                </button>
                
        </div>
    );
}