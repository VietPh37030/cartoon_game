

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
    return (
        <button
            id={id}
            className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black 
            ${containerClass} transition-colors duration-300 ease-in-out hover:bg-amber-700 hover:text-white`} // Thêm hiệu ứng hover
        >
            {leftIcon}
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    );
};

export default Button
