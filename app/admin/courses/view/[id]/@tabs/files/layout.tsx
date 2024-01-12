export default async function FileManagerLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
  resource_nav: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div>{preview}</div>
    </div>
  );
}
