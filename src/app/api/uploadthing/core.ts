import { getUser } from '@/app/(frontend)/(authenticated)/_actions/getUser'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

// const auth = (req: Request) => ({ id: `fakeId` }); // Fake auth function
// const user = await getUser()

// const auth = (req: Request) => ({ id: user?.id }) // Fake auth function

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  //   imageUploader: f({ image: { maxFileSize: '16MB' } })

  //     .onUploadComplete(async ({ metadata, file }) => {
  //       console.log('Image upload complete for userId:', metadata.userId)

  //       console.log('file url', file.url)

  //       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //       return { uploadedBy: metadata.userId }
  //     })
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '16MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req)
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError('Unauthorized')
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id }
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Image upload complete for userId:', 1)

      //   console.log('file url', file.ufsUrl)
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: 1 }
    }),

  musicUploader: f({
    audio: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '128MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    // .middleware(async ({ req }) => {
    //   // This code runs on your server before upload
    //   const user = await auth(req)
    //   // If you throw, the user will not be able to upload
    //   if (!user) throw new UploadThingError('Unauthorized')
    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id }
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Music upload complete for userId:', 1)
      //   console.log('file url', file.ufsUrl)
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: 1 }
    }),

  //   musicUploader: f({ audio: { maxFileSize: '128MB' } })
  //     // Set permissions and file types for this FileRoute
  //     .middleware(authenticateUser)
  //     .onUploadComplete(async ({ metadata, file }) => {
  //       // This code RUNS ON YOUR SERVER after upload
  //       console.log('Music upload complete for userId:', metadata.userId)

  //       console.log('file url', file.url)

  //       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //       return { uploadedBy: metadata.userId }
  //     }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
