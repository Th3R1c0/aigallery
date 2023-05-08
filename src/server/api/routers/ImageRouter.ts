import { desc, eq, ne, and } from "drizzle-orm";
import { z } from "zod";
import { db, ranktable } from "db/drizzleDB";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const imageRouter = createTRPCRouter({
  SubmitImageRank: publicProcedure
    .input(z.object({
        pickedImage: z.string(),
        otherImage: z.string(),
    }))
    .mutation(async ({ input }) => {
       

        const { pickedImage, otherImage } = input;
        // Find the picked image and increment its rank
        const pickedimg = await db.select().from(ranktable).where(eq(ranktable.image, pickedImage ))
       
        const otherimg = await db.select().from(ranktable).where(eq(ranktable.image, otherImage))
       
        
        const updateArt1 = await db.update(ranktable).set({rank: otherimg[0]?.rank - 1}).where(eq(ranktable.image, input.otherImage));
        const updateArt2 = await db.update(ranktable).set({rank: pickedimg[0]?.rank + 1, totalvoates: pickedimg[0]?.totalvoates + 1}).where(eq(ranktable.image, input.pickedImage));
          

    }),
    getImages: publicProcedure.query(async () => {
        const art = await db.select().from(ranktable).orderBy(desc(ranktable.rank)).limit(4);
        console.log('getimages was here')
        return art
    }),
    getImagePair: publicProcedure.input(z.object({number: z.number().default(2)})).query(async ({input}) => {
        const min = 1;
        const max = 260;
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        const imagesAmmount = input.number;
        const nextImages = await db.select().from(ranktable).limit(imagesAmmount).offset(randomNumber)
        return nextImages;
    })
});


    //     const img1 = art[Math.floor(Math.random() * 6)]
    //     const img2 = art.filter((img) => img !== img1)[Math.floor(Math.random() * 6)];
    //   return [img1, img2]