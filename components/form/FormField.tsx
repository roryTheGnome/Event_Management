export default function FormField({
                       label,
                       id,
                       type,
                       name,
                       value,
                       onChange,
                       placeholder,
                       required = false,
                   }: {
    label: string;
    id: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-1 text-gray-400 font-semibold">
                {label}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-[#1E2164] rounded-xl bg-[#000010] text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
        </div>
    );
}