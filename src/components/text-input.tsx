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
            <div className="relative rounded-t bg-slate-200">
                <input
                    type="text"
                    id={id}
                    ref={ref}
                    {...rest}
                    placeholder={label}
                    className={clsx(
                        "peer relative w-full border-b-2 border-slate-400 bg-transparent px-4 pb-2 pt-6 text-sm text-slate-600 placeholder-transparent outline-none transition-all focus:border-blue-700"
                    )}
                />
                <label
                    htmlFor={id}
                    className="absolute left-4 top-2 z-10 text-xs text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-blue-700"
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
