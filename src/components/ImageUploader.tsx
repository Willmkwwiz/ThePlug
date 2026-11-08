import { Images, ImagePlus, Loader2, X } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { resizeImageToDataUrl } from '@/lib/imageResize';

interface ImageUploaderProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setError(null);
    setProcessing(true);
    try {
      onChange(await resizeImageToDataUrl(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That image could not be used. Try a different photo.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        id="listing-image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
      />

      {value ? (
        <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
          <img src={value} alt="Selected listing preview" className="aspect-[4/3] w-full object-cover" />
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-stone-800 shadow transition hover:bg-stone-100"
            >
              Change photo
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remove photo"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-stone-800 shadow transition hover:bg-ember-50 hover:text-ember-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className="group flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center transition hover:border-brand-500 hover:bg-brand-50 disabled:cursor-wait"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm transition group-hover:scale-105">
            {processing ? <Loader2 className="h-7 w-7 animate-spin" /> : <ImagePlus className="h-7 w-7" />}
          </span>
          <span className="text-sm font-semibold text-stone-800">
            {processing ? 'Preparing your photo...' : 'Add a photo (optional)'}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-stone-500">
            <Images className="h-3.5 w-3.5" />
            JPG, PNG or WebP. Without a photo we show a placeholder.
          </span>
        </button>
      )}

      {error && (
        <p role="alert" className="text-sm text-ember-700">
          {error}
        </p>
      )}
    </div>
  );
}
