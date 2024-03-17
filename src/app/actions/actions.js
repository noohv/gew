"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveData(participantId, data) {
  const convertToNewFormat = async (data) => {
    const result = {};

    data.forEach((item) => {
      const { id, rating } = item;
      if (item.id === "none") {
        result[id] = true;
        return;
      }
      if (item.id === "other") {
        result.other = item.emotions.map((obj) => ({
          ...obj,
          rating: parseInt(obj.rating),
        }));
      } else {
        result[id] = parseInt(rating);
      }
    });

    return result;
  };

  console.log(await convertToNewFormat(data));

  const { other, ...rest } = await convertToNewFormat(data);
  const result = await prisma.emotions.create({
    data: {
      participantId: participantId,
      other: {
        create: other,
      },
      ...rest,
    },
  });

  return result;
}
