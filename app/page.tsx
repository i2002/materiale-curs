import { Card, Grid, Text, Title } from "@tremor/react";
import prisma from './_lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany();

  return (
    <main className="p-5 md:p-24">
      <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        {posts.map(post => (
          <Card className="dark:hover:bg-slate-800 hover:bg-slate-50 active:bg-slate-100 cursor-pointer" key={post.id}>
            <Title>{post.title}</Title>
            <Text>{post.content}</Text>
          </Card>
        ))}
      </Grid>
    </main>
  )
}
