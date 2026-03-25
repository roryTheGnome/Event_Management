export default function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span className="text-gray-400 font-semibold">{label}:</span>
            <span className="text-white mt-1 sm:mt-0">{value}</span>
        </div>
    );
}