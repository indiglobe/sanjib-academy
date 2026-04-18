const ComingSoon = () => {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-4">
      {/* Background Glow */}
      <div className="from-primary-100 via-background to-accent-100 dark:from-primary-900 dark:via-background dark:to-accent-900 absolute inset-0 -z-10 bg-linear-to-br opacity-50 blur-2xl" />

      <div className="w-full max-w-xl space-y-6 text-center">
        {/* Badge */}
        <div className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 inline-block rounded-full px-3 py-1 text-xs font-medium">
          🚧 Feature in Progress
        </div>

        {/* Title */}
        <h1 className="font-brand-secondary text-2xl font-bold sm:text-3xl md:text-4xl">
          Coming Soon
        </h1>

        {/* Description */}
        <p className="text-foreground/70 mx-auto max-w-md text-sm sm:text-base">
          This feature is currently under development. We're working to bring it
          to you as soon as possible.
        </p>

        {/* Decorative Loader */}
        <div className="flex justify-center pt-4">
          <div className="flex space-x-2">
            <span className="bg-primary-500 h-2.5 w-2.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
            <span className="bg-primary-500 h-2.5 w-2.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
            <span className="bg-primary-500 h-2.5 w-2.5 animate-bounce rounded-full" />
          </div>
        </div>

        {/* Optional Back Button */}
        <div className="pt-6">
          <button
            onClick={() => window.history.back()}
            className="border-primary-300 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-100 rounded-lg border px-5 py-2 text-sm transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
