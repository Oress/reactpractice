import { forwardRef } from "react";

const Input = forwardRef(function Input({ isMultiline = false, label, ...props }, ref) {
    const classes = "block bg-stone-300 border-b-2 border-black w-full focus:outline-none px-2 py-1";

    return (
        <div className="w-full">
            <label className="font-bold text-stone-600 uppercase">{label}</label>
            {isMultiline ?
                <textarea ref={ref} {...props} className={classes}></textarea>
                : <input ref={ref} {...props} className={classes}></input>
            }
        </div>
    );
});

export default Input;