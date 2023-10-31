import Header from "@/components/ui/AppHeader";
import { Button, Card, Title } from "@tremor/react";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header title="Materiale curs"></Header>
      <Card className="max-w-sm mx-auto mt-20 text-center">
        <Title>Permisiuni insuficiente</Title>
        <div className="border-t pt-4 mt-4">
          <Link href="/api/auth/signout">
            <Button size="xs" variant="primary" color="teal">
              Schimbare cont
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
