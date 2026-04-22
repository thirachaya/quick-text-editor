'use client'

type Props = {
    value: string
    onChange: (v: string) => void
    placeholder?: string
    isLarge?: boolean
}

export default function Input({ value, onChange, placeholder, isLarge }: Props) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`
                w-full
                border border-gray-200
                rounded-lg
                bg-white
                outline-none
                transition-all duration-200
                box-border

                ${isLarge
                    ? 'px-5 py-4 text-2xl font-semibold text-emerald-800'
                    : 'px-4 py-3 text-sm text-gray-800'
                }

                focus:border-emerald-500
                focus:ring-4 focus:ring-emerald-200
            `}
        />
    )
}