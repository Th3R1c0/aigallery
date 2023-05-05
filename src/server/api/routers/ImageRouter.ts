import { desc, eq, ne, and } from "drizzle-orm";
import { z } from "zod";
import { db, ranktable } from "~/pages/db/drizzleDB";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
let art = [
    {
      image:
        "https://cdn.discordapp.com/attachments/1026555762874519592/1026774181582475324/sentinel_long_tall_frightening_building_coal_house_wood_d30397ca-e74f-4f0f-b417-53db68936a9a_1.png",
      rank: 0,
      totalVotes: 0,
    },
    {
      image:
        "https://cdn.discordapp.com/attachments/1026555762874519592/1026795679340834816/unknown.png",
      rank: 0,
      totalVotes: 0,
    },
    {
      image:
        "https://cdn.discordapp.com/attachments/1026555762874519592/1026797842565709864/unknown.png",
      rank: 0,totalVotes: 0,
    },
    {
      image:
        "https://cdn.discordapp.com/attachments/1026555762874519592/1026800863823536138/unknown.png",
      rank: 0,totalVotes: 0,
    },
    {
      image:
        "https://cdn.discordapp.com/attachments/1026555762874519592/1026821912913002556/unknown.png",
      rank: 0,totalVotes: 0,
    },
    {
      image:
        "https://media.discordapp.net/attachments/1019637021058281553/1026821524302340208/jpuidev_this_interaction_failed_0fc1c4c8-4ed9-4a26-9051-4a85306aadf4.png",
      rank: 0,totalVotes: 0,
    },
  ];

export const imageRouter = createTRPCRouter({
  SubmitImageRank: publicProcedure
    .input(z.object({
        pickedImage: z.string(),
        otherImage: z.string(),
    }))
    .mutation(async ({ input }) => {
       


        // const updatedArt = art.map((img) => {
        //   if (img.image === pickedImage) {
        //     return {
        //       ...img,
        //       rank: img.rank + 1,
        //       totalVotes: img.totalVotes + 1,
        //     };
            
        //   } else if (img.image === input.otherImage) {
        //     return {
        //         ...img,
        //         rank: img.rank - 1,
        //     }

        //   }
        //   return img;
        // });
        // art = updatedArt;
        const { pickedImage, otherImage } = input;
        // Find the picked image and increment its rank
        const pickedimg = await db.select().from(ranktable).where(eq(ranktable.image, pickedImage ))
       
        const otherimg = await db.select().from(ranktable).where(eq(ranktable.image, otherImage))
       
        
        const updateArt1 = await db.update(ranktable).set({rank: otherimg[0]?.rank - 1}).where(eq(ranktable.image, input.otherImage));
        const updateArt2 = await db.update(ranktable).set({rank: pickedimg[0]?.rank + 1, totalvoates: pickedimg[0]?.totalvoates + 1}).where(eq(ranktable.image, input.pickedImage));
        
        
        // // filter to get all images that are not the picked image
        // // const avaliableImages = art.filter((img) => img.image !== pickedImage);

        // // // get random image from available images
        // // const firstImage = avaliableImages[Math.floor(Math.random() * avaliableImages.length)];

        // // // get image that is not the first image and has the same rank as the first image
        // // let secondImage;
        // // if (firstImage && avaliableImages.length > 1) {
        // // const sameRankImages = avaliableImages.filter((img) => img !== firstImage && img.rank === firstImage.rank);
        // // if (sameRankImages.length > 0) {
        // //     secondImage = sameRankImages[Math.floor(Math.random() * sameRankImages.length)];
        // // } else {
        // //     // if no images with the same rank, get random image that is not the first image
        // //     secondImage = avaliableImages.filter((img) => img !== firstImage)[Math.floor(Math.random() * (avaliableImages.length - 1))];
        // // }
        // // }
   
        
        

    }),
    getImages: publicProcedure.query(async () => {
        const art = await db.select().from(ranktable).orderBy(desc(ranktable.rank)).limit(4);
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