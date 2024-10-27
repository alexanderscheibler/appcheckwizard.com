import CustomImage from "@components/CustomImage"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 text-center">
          <p className="pb-14 sm:pb-0"><a property="dct:title" rel="cc:attributionURL" href="https://www.appcheckwizard.com">AppCheckWizard.com</a> &copy; {new Date().getFullYear()} by
              <span property="cc:attributionName">
                  <a href="https://www.appcheckwizard.com/#contact"> Alexander Scheibler</a>.
              </span>
              </p>
          <p className="pb-14 sm:pb-0">
              Content is licensed under
              <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer">
                  : CC BY-SA 4.0.
                  <span className="flex justify-center items-center space-x-1 mt-1">
                  <CustomImage
                    src="/images/cc.svg"
                    alt="CC"
                    width={24}  // specify width directly for Next.js Image
                    height={24} // specify height directly
                    unoptimized
                  />
                  <CustomImage
                    src="/images/by.svg"
                    alt="BY"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <CustomImage
                    src="/images/sa.svg"
                    alt="SA"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  </span>
              </a>
          </p>
      </div>
    </footer>
  )
}