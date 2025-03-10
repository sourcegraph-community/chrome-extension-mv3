import sourcegraphLogo from "data-base64:~/../assets/sourcegraph-mark.svg"
import { Book, ExternalLink, Globe } from "lucide-react"

import { useSourcegraphStore } from "~stores/useSourcegraphStore"

import "~style.css"

export default function SourcegraphConfig() {
  const { url, setSourcegraphUrl } = useSourcegraphStore()
  return (
    <div className="w-[400px]   max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center h-full ">
              <img
                src={sourcegraphLogo}
                width={36}
                height={36}
                alt="Sourcegraph logo"
                className="h-8 w-8 m-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">Sourcegraph</span>
              <span className="ml-2 text-sm text-gray-500">
                v{chrome.runtime.getManifest().version}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b">
        <p className="text-sm text-gray-700">
          Get code navigation tooltips while browsing and reviewing code on your
          code host about the extension and compatible code hosts.
        </p>
      </div>

      <div className="p-4 border-b">
        <h3 className="font-bold mb-2">Sourcegraph URL</h3>
        <div className="relative">
          <input
            onChange={(e) => setSourcegraphUrl(e.target.value)}
            type="text"
            value={url}
            className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Enter the URL of your Sourcegraph instance to use the extension on
          private code.
        </p>

        <div className="mt-4">
          <a
            target="_blank"
            href="https://sourcegraph.com/docs/integration/browser_extension#privacy"
            className="text-blue-500 hover:underline flex items-center text-sm">
            How do we keep your code private?
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x">
        <a
          target="_blank"
          href="https://sourcegraph.com/search"
          className="py-3 text-center text-blue-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
          <Globe className="h-4 w-4" />
          <span>Sourcegraph.com</span>
        </a>
        <a
          target="_blank"
          href="https://sourcegraph.com/docs"
          className="py-3 text-center text-blue-500 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
          <Book className="h-4 w-4" />
          <span>Documentation</span>
        </a>
      </div>
    </div>
  )
}
