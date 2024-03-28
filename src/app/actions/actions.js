"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function saveData(participantId, surveyData, data) {
  try {
    // Convert emotion data to savable format
    const { other, ...rest } = await convertToNewFormat(data);

    const result = await prisma.responseData.create({
      data: {
        participantId: participantId,
        other: other,
        surveyData: surveyData,
        ...rest,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "An error occurred while saving data." };
  }
}
