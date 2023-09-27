import { Button, Card, Text, Title } from '@tremor/react';
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <Card className="max-w-sm mx-auto mt-6 text-center">
        <Title>Conținut inexistent</Title>
        <Text>Resursa specificată nu a putut fi găsită.</Text>
        <div className="border-t pt-4 mt-4">
          <Link href="/courses">
            <Button size="xs" variant="primary" color="teal">
            Înapoi la lista de cursuri
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
