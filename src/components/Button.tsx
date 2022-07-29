interface ButtonProps {
    children: string
    onClick: () => void
    disabled: boolean
}
function Button({children, onClick, disabled}: ButtonProps) {
    return (
        <button disabled={disabled} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 rounded px-24 m-16" onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
