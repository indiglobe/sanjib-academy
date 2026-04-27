import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/ui/accordion";
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  FileText,
  Download,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { useRouteContext } from "@tanstack/react-router";

export function CourseDetails({ className, ...props }: ComponentProps<"div">) {
  const { courseModules, courseDetails } = useLoaderData({
    from: "/(public)/(landing-pages)/resources/course/$courseId/",
  });

  let totalActivities = 0;

  courseModules.forEach((m) => {
    totalActivities = totalActivities + m.videos.length + m.documents.length;
  });

  return (
    <div className={cn("space-y-6 p-4 sm:p-6 lg:p-8")} {...props}>
      {/* Banner */}
      <div className="relative h-40 overflow-clip rounded-2xl bg-linear-to-r from-purple-300 to-purple-100">
        <Image
          src={courseDetails.imageLink}
          alt="Course image"
          layout="fullWidth"
          className={cn(`absolute h-full w-full object-cover`)}
        />
      </div>

      {/* Title + Subheading + CTA + Metrics */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-2">
          <h1 className="text-2xl font-bold">{courseDetails.courseTopic}</h1>

          {/* Subheading */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {courseDetails.courseHeading}
          </p>

          {/* Download Brochure Button */}
          <a
            href={courseDetails.brochureLink}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80"
          >
            <Download className="size-4" />
            Download Brochure
          </a>
        </div>

        {/* course metric content */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard>
            <MetricCardIcon className="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300">
              <BookOpen className="size-5" />
            </MetricCardIcon>
            <MetricCardContent>
              <MetricCardLabel>Total Course Modules</MetricCardLabel>
              <MetricCardValue>{courseModules.length}</MetricCardValue>
            </MetricCardContent>
          </MetricCard>

          <MetricCard>
            <MetricCardIcon className="bg-secondary-50 text-secondary-800 dark:bg-secondary-950 dark:text-secondary-300">
              <PlayCircle className="size-5" />
            </MetricCardIcon>
            <MetricCardContent>
              <MetricCardLabel>Activities</MetricCardLabel>
              <MetricCardValue>{totalActivities}</MetricCardValue>
            </MetricCardContent>
          </MetricCard>

          <MetricCard>
            <MetricCardIcon className="bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300">
              <BarChart3 className="size-5" />
            </MetricCardIcon>
            <MetricCardContent>
              <MetricCardLabel>Course Level</MetricCardLabel>
              <MetricCardValue>Beginner</MetricCardValue>
            </MetricCardContent>
          </MetricCard>
        </div>
        {/* course metric content */}
      </div>

      {/* CourseModules */}
      <div className="space-y-4">
        {courseModules.map((module, idx) => (
          <CourseModule
            key={module.id}
            value={module.courseId}
            defaultOpen={idx + 1 === 1}
          >
            <CourseModuleHeader>
              <CourseModuleTitle>
                {idx + 1}. {module.title}
              </CourseModuleTitle>
            </CourseModuleHeader>

            <CourseModuleDescription>
              {module.description}
            </CourseModuleDescription>

            {/* MODULE ASSET OVERVIEW */}
            <div className={cn(`flex gap-4`)}>
              {module.videos.length > 0 && (
                <CourseModuleAssetOverview>
                  <CourseModuleAssetLabel>
                    <span>
                      <PlayCircle size={4} />
                    </span>
                    <span>{`${module.videos.length} Videos`}</span>
                  </CourseModuleAssetLabel>
                </CourseModuleAssetOverview>
              )}

              {module.documents.length > 0 && (
                <CourseModuleAssetOverview>
                  <CourseModuleAssetLabel>
                    <span>
                      <FileText size={4} />
                    </span>
                    <span>{`${module.documents.length} Readings`}</span>
                  </CourseModuleAssetLabel>
                </CourseModuleAssetOverview>
              )}
            </div>

            <CourseModuleContent>
              {/* module content starts where the module asset detail thumbnails are present */}
              {/* MEDIA GRID */}
              <div className={cn(`mt-4 space-y-2`)}>
                {module.videos.length > 0 && (
                  <ModuleMediaItemList>
                    {module.videos.map((v) => (
                      <Media>
                        <Thumbnail src={v.thumbnailImage} />
                        <MediaMetadata>
                          <MediaTitle>{v.videoTitle}</MediaTitle>
                          {v.videoDescription && (
                            <MediaDescription>
                              {v.videoDescription}
                            </MediaDescription>
                          )}
                          <MediaType>Video</MediaType>
                        </MediaMetadata>
                      </Media>
                    ))}
                  </ModuleMediaItemList>
                )}

                {module.documents.length > 0 && (
                  <ModuleMediaItemList>
                    {module.documents.map((d) => (
                      <Media>
                        <Thumbnail src={d.thumbnailImage} />
                        <MediaMetadata>
                          <MediaTitle>{d.documentTitle}</MediaTitle>
                          {d.documentDescription && (
                            <MediaDescription>
                              {d.documentDescription}
                            </MediaDescription>
                          )}
                          <MediaType>Document</MediaType>
                        </MediaMetadata>
                      </Media>
                    ))}
                  </ModuleMediaItemList>
                )}
              </div>
              {/* module content ends where the module asset detail thumbnails are present */}
            </CourseModuleContent>
          </CourseModule>
        ))}
      </div>
      {/* CourseModules */}
    </div>
  );
}

export function MetricCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3 dark:border-white/10 dark:bg-zinc-950",
        className,
      )}
      {...props}
    />
  );
}

export function MetricCardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("grid size-11 place-items-center rounded-xl", className)}
      {...props}
    />
  );
}

export function MetricCardContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("space-y-0.5", className)} {...props} />;
}

export function MetricCardLabel({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-zinc-500", className)} {...props} />;
}

export function MetricCardValue({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-lg font-semibold", className)} {...props} />;
}

export function CourseModule({
  value,
  defaultOpen,
  className,
  children,
  ...props
}: {
  value: string;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
} & ComponentProps<typeof AccordionItem>) {
  return (
    <Accordion
      data-slot={`course-module`}
      type="single"
      collapsible
      defaultValue={defaultOpen ? value : undefined}
    >
      <AccordionItem
        value={value}
        className={cn(
          "rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-zinc-950",
          className,
        )}
        {...props}
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
}

export function CourseModuleHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`course-module-header`}
      className={cn("flex w-full items-start justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CourseModuleTitle({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      data-slot={`course-module-title`}
      noIcon
      className={cn(
        "flex w-full items-start gap-3 p-0 hover:no-underline",
        className,
      )}
      {...props}
    >
      <h3 className={cn("w-full text-left text-lg font-semibold")}>
        {children}
      </h3>
    </AccordionTrigger>
  );
}

export function CourseModuleContent({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <AccordionContent
      data-slot={`course-module-content`}
      className={cn("mt-4 border-t pt-4", className)}
      {...props}
    >
      {children}
    </AccordionContent>
  );
}

export function CourseModuleDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot={`course-module-description`}
      className={cn("text-sm text-zinc-600 dark:text-zinc-400", className)}
      {...props}
    />
  );
}

export function CourseModuleAssetOverview({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 flex flex-wrap gap-4", className)} {...props} />
  );
}

export function CourseModuleAssetLabel({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-foreground/70 flex items-center gap-2 text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CourseModuleActions({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 flex flex-wrap gap-3", className)} {...props} />
  );
}

export function MediaItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `group border-primary-500/40 dark:border-primary-500/40 bg-primary-100/30 dark:bg-primary-100/10 hover:bg-primary-100/70 dark:hover:bg-primary-100/30 flex items-start gap-4 rounded-lg border p-3 transition`,
        className,
      )}
      {...props}
    />
  );
}

function MediaThumbnail({
  src,
  href,
  icon: Icon,
  isVideo,
}: {
  src?: string | null;
  href: string;
  icon: LucideIcon;
  isVideo?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        `border-primary-200/40 dark:border-primary-800/40 relative h-16 w-28 shrink-0 overflow-hidden rounded-sm border`,
      )}
    >
      {src ? (
        <Image
          layout="fullWidth"
          src={src}
          className={cn(
            `h-full w-full object-cover transition group-hover:scale-105`,
          )}
        />
      ) : (
        <div
          className={cn(
            `bg-primary-100 dark:bg-primary-900 grid h-full w-full place-items-center`,
          )}
        >
          <Icon
            className={cn(`text-primary-700 dark:text-primary-300 size-5`)}
          />
        </div>
      )}

      {/* Overlay */}
      {isVideo && (
        <div
          className={cn(
            `absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition group-hover:opacity-100`,
          )}
        >
          <PlayCircle className={cn(`size-5 text-white`)} />
        </div>
      )}
    </a>
  );
}

function MediaContent({
  title,
  description,
  meta,
}: {
  title: string;
  description?: string | null;
  meta?: string;
}) {
  return (
    <div className={cn(`flex flex-1 flex-col gap-1`)}>
      <p
        className={cn(
          `text-primary-500 dark:text-primary-900 text-sm font-medium`,
        )}
      >
        {title}
      </p>

      {description && (
        <p
          className={cn(
            `text-primary-500/60 dark:text-primary-900/60 line-clamp-2 text-xs`,
          )}
        >
          {description}
        </p>
      )}

      {meta && (
        <p
          className={cn(`text-primary-700 dark:text-primary-300 mt-1 text-xs`)}
        >
          {meta}
        </p>
      )}
    </div>
  );
}

export function VideoItem({
  video,
}: {
  video: {
    id: number;
    videoURL: string;
    thumbnailImage?: string | null;
    videoTitle: string;
    videoDescription?: string | null;
    duration?: string;
  };
}) {
  const { session } = useRouteContext({
    from: "/(public)/(landing-pages)/resources/course/$courseId/",
  });

  return (
    <MediaItem>
      <MediaThumbnail
        src={video.thumbnailImage}
        href={video.videoURL}
        icon={PlayCircle}
        isVideo
      />

      <MediaContent
        title={video.videoTitle}
        description={video.videoDescription}
        meta={video.duration ? `Duration: ${video.duration}` : "Video"}
      />

      {!session && <div>lock</div>}
    </MediaItem>
  );
}

export function DocumentListItem({
  document,
}: {
  document: {
    id: number;
    documentURL: string;
    thumbnailImage?: string | null;
    documentTitle: string;
    documentDescription?: string | null;
    pages?: number;
  };
}) {
  return (
    <MediaItem>
      <MediaThumbnail
        src={document.thumbnailImage}
        href={document.documentURL}
        icon={FileText}
      />

      <MediaContent
        title={document.documentTitle}
        description={document.documentDescription}
        meta={document.pages ? `Pages: ${document.pages}` : "Document"}
      />
    </MediaItem>
  );
}

export function ModuleMediaItemList({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`module-media-item-list`}
      className={cn(`space-y-2`, className)}
      {...props}
    />
  );
}

// refractor

export function Media({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `group border-primary-500/40 dark:border-primary-500/40 bg-primary-100/30 dark:bg-primary-100/10 hover:bg-primary-100/70 dark:hover:bg-primary-100/30 flex items-start gap-4 rounded-lg border p-3 transition`,
        className,
      )}
      {...props}
    />
  );
}

export function Thumbnail({
  className,
  src,
  ...props
}: ComponentProps<"div"> & Pick<ComponentProps<typeof Image>, "src">) {
  return (
    <div
      className={cn(`h-16 w-28 overflow-clip rounded-sm`, className)}
      {...props}
    >
      <Image
        layout="fullWidth"
        src={src}
        className={cn(
          `h-full w-full object-cover transition group-hover:scale-105`,
        )}
      />
    </div>
  );
}

export function MediaTitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        `text-primary-500 dark:text-primary-900 text-sm font-medium`,
        className,
      )}
      {...props}
    />
  );
}

export function MediaDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        `text-primary-500/60 dark:text-primary-900/60 line-clamp-2 text-xs`,
        className,
      )}
      {...props}
    />
  );
}

export function MediaMetadata({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(`flex flex-1 flex-col gap-1`, className)} {...props} />
  );
}

export function MediaType({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        `text-primary-700 dark:text-primary-300 mt-auto mb-0 text-xs`,
        className,
      )}
      {...props}
    />
  );
}
