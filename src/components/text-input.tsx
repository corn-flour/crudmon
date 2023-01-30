import { forwardRef, type InputHTMLAttributes, useId } from "react"
import clsx from "clsx"

type TextInputProps = {
    label: string
    errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, errorMessage, ...rest }, ref) => {
        const id = useId()

        return (
            <div className="relative mb-4 rounded-t bg-slate-200">
                <input
                    type="text"
                    id={id}
                    ref={ref}
                    {...rest}
                    placeholder={label}
                    className={clsx(
                        "peer relative w-full border-b-2 bg-transparent px-4 pb-2 pt-6 text-sm text-slate-600 placeholder-transparent outline-none transition-all ",
                        !errorMessage
                            ? "border-slate-400 focus:border-blue-700"
                            : "border-pink-700"
                    )}
                />
                <label
                    htmlFor={id}
                    className={clsx(
                        "absolute left-4 top-2 z-10 cursor-text text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-required:after:text-red-700 peer-required:after:content-['_*'] peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs",
                        !errorMessage
                            ? " text-slate-500 peer-focus:text-blue-700"
                            : "text-pink-700"
                    )}
                >
                    {label}
                </label>
                {!!errorMessage && (
                    <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-pink-500 transition">
                        <span>{errorMessage}</span>
                    </small>
                )}
            </div>
        )
    }
)

TextInput.displayName = "TextInput"

export default TextInput
