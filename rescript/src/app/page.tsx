export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col">
      <div className="w-3/4 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Technical Exploration of ReScript
        </h1>

        <div className="font-mono text-sm md:text-base space-y-4">
          <p className="leading-relaxed">
            This application serves as a technical playground for exploring
            <span className="text-primary font-semibold"> ReScript</span> - a robustly typed language
            that compiles to efficient JavaScript.
          </p>

          <div className="bg-code-bg p-4 rounded-md">
            <p className="leading-relaxed">
              ReScript combines the expressiveness of JavaScript with the safety and tooling of
              static typing, offering a pragmatic approach to building reliable web applications.
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-6 text-primary">Key Features Being Explored:</h2>

          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Type-safe integration with React and Next.js</li>
            <li>Zero-runtime-cost type system</li>
            <li>Blazing fast compilation</li>
            <li>Excellent JavaScript interoperability</li>
            <li>Pattern matching and functional programming paradigms</li>
          </ul>

          <div className="bg-code-bg p-4 rounded-md mt-6">
            <code className="block whitespace-pre">
              {`// Sample ReScript code
type user = {
  id: string,
  name: string,
  isAdmin: bool,
}

let greet = (user: user) => {
  let role = user.isAdmin ? "admin" : "user"
  \`Hello \${user.name}, you are an \${role}!\`
}`}
            </code>
          </div>

          <p className="leading-relaxed mt-6">
            This project aims to demonstrate how ReScript can be used effectively
            in modern web development workflows, particularly in combination with
            Next.js, React, and Tailwind CSS.
          </p>
        </div>
      </div>
    </main>
  );
}
