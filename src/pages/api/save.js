import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const data = req.body;

  const jsonData = JSON.parse(data);

  const result = await prisma.emotions.create({
    data: {
      participantId: "amogus",
      ...jsonData,
    },
  });
  res.json(data);
}
