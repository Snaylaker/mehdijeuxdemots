import axios from "axios"
import React, { useState } from "react"

const App: React.FC = () => {
  const [repo, setRepo] = useState("")
  const [prs, setPrs] = useState<any[]>([])

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo}/pulls`
      )
      const data = response.data
      const beginnerPRs = data.filter((pr: any) =>
        pr.labels.some((label: any) =>
          ["good first issue", "beginner-friendly"].includes(
            label.name.toLowerCase()
          )
        )
      )
      setPrs(beginnerPRs)
    } catch (error) {
      console.error("Error fetching PRs:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        GitHub Beginner-friendly PR Checker
      </h1>
      <div className="flex gap-4">
        <input
          className="p-2 border rounded"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Enter repo (e.g. owner/repo-name)"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Check PRs
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {prs.map((pr) => (
          <li key={pr.id} className="border p-2 rounded">
            <a
              href={pr.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {pr.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
