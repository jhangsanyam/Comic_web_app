import { query } from "@/services/generator";

export async function generator(data) {
  let data1 = [data,data,data,data,data,data,data,data,data,data]
  const promises = data1.map(async (input) => {
    return query({ inputs: input });
  });

  const results = await Promise.all(promises);
  return results;
}
