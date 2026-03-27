import { cloudinary } from "@/integrations/cloudinary";
import { welcomePageAvatarUploadSchema } from "@repo/utils/zod-schema/welcome-form";
import { createFileRoute } from "@tanstack/react-router";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type UploadResult =
  | {
      status: "fail";
      reason?: UploadApiErrorResponse;
    }
  | {
      status: "success";
      result: UploadApiResponse;
    };

export const Route = createFileRoute("/api/upload-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        const parsedData = welcomePageAvatarUploadSchema.safeParse(formData);

        if (parsedData.error)
          return new Response(
            JSON.stringify({ status: "fail" } satisfies UploadResult),
          );

        const {
          data: { avatar, userEmail },
        } = parsedData;

        // Convert to buffer
        const arrayBuffer = await avatar.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Then use upload_stream
        const result: UploadApiResponse = await new Promise(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: `temp/avatar/${userEmail}`,
                public_id: crypto.randomUUID(),
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result as UploadApiResponse);
              },
            );

            uploadStream.end(buffer); // ✅ send Buffer, not File
          },
        );

        console.log(result);

        return new Response(
          JSON.stringify({ status: "success", result } satisfies UploadResult),
        );
      },
    },
  },
});
