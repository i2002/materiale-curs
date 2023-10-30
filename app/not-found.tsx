import Header from "@/components/ui/AppHeader";
import { Button, Card, Title } from "@tremor/react";
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <Header title="Materiale curs"></Header>
      <Card className="max-w-sm mx-auto mt-20 text-center">
        <Title>Pagină inexistentă</Title>
        <div className="border-t pt-4 mt-4">
          <Link href="/">
            <Button size="xs" variant="primary" color="teal">
              Înapoi la pagina principală
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
