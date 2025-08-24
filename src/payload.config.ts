// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import sharp from "sharp"; // sharp-import
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { stripePlugin } from "@payloadcms/plugin-stripe";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users/config";
import { PerformanceVideos } from "./collections/Performance Videos";
import { Footer } from "./Footer/config";
import { Header } from "./Header/config";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import { Config, User } from "./payload-types";
import { RelationshipField } from "@payloadcms/ui";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
// import { Performers } from "./collections/Performers";
import { Showcases } from "./collections/Showcases";
import { Tickets } from "./collections/Tickets";
// import { Attendees } from "./collections/Attendees";
import { TicketTypes } from "./collections/TicketTypes";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    meta: {
      title: "Worship Burlesque",
      description: "Admin page for Worship Burlesque",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.ico",
        },
      ],
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ["@/components/BeforeDashboard"],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,

  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.DATABASE_URI,
  }),
  collections: [
    Pages,
    Posts,
    PerformanceVideos,
    Media,
    Categories,
    Users,
    // Performers,
    Tickets,
    Showcases,
    // Attendees,
    TicketTypes,
    // {
    //   slug: "tenants",
    //   admin: {
    //     useAsTitle: "name",
    //   },
    //   fields: [
    //     // remember, you own these fields
    //     // these are merely suggestions/examples
    //     {
    //       name: "name",
    //       type: "text",
    //       required: true,
    //     },
    //     {
    //       name: "slug",
    //       type: "text",
    //       required: true,
    //     },
    //     {
    //       name: "domain",
    //       type: "text",
    //       required: true,
    //     },
    //   ],
    // },
  ],

  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: "public-read",
      },
    }),
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
    }),

    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
