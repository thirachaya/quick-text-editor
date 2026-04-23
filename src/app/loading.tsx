import Spinner from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-5 px-8 py-6">
        
        {/* Spinner */}
        <Spinner size="lg" color="text-emerald-600" />

        {/* Text */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-emerald-700 font-semibold">
            Loading, please wait...
          </p>
        </div>

      </div>
    </div>
  );
}