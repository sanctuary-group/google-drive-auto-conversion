export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-muted/40 via-background to-muted/30 p-4">
      {children}
    </div>
  );
}
