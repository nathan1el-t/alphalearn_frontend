import "@mantine/tiptap/styles.css";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
