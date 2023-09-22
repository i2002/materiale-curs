interface HeroBannerProps {
  title: string;
  subtitle?: string;
}

export default function HeroBanner({ title, subtitle }: HeroBannerProps) {
  return (
    <div className="text-center pt-3 h-28 flex flex-col items-center justify-center">
      <h2 className="text-2xl">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}
