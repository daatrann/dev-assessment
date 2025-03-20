const Header = () => {
    return (
        <header className='bg-gray-200 py-1 flex w-full justify-center items-center'>
            <div className="md:w-3/4 flex items-center gap-2">
            <img src="singapore-icon.svg" alt="lion icon" className="w-4 h-4 md:w-5 md:h-5"/>
            <p className="text-gray-500 text-xs md:text-sm">
                An Official Website of the <span className="font-semibold">Singapore Government</span>
            </p>
            </div>
        </header>
    );
};

export default Header;