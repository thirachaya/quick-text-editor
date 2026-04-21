'use client'

type Props = {
    value: string
    onChange: (v: string) => void
    placeholder?: string
}

export default function Input({ value, onChange, placeholder }: Props) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
            }}
        />
    )
}