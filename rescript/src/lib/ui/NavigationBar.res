module NavigationBarLogo = {
  @react.component
  let make = () => {
    <Next.Link href="/">
      <span className="text-xl ml-2 align-middle font-semibold">
        <span className="text-black-800"> {React.string("Fcking ")} </span>
        <span className="text-orange-800"> {React.string("ReScript")} </span>
      </span>
    </Next.Link>
  }
}

module LoginButton = {
  @react.component
  let make = () => {
    <Next.Link href="/login">
      <button
        className="px-4 py-1 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors">
        {React.string("Login")}
      </button>
    </Next.Link>
  }
}

module Navigation = {
  @react.component
  let make = () => {
    <nav className="p-2 h-12 flex border-b border-gray-200 justify-between items-center text-sm">
      <NavigationBarLogo />
      <div className="flex w-2/3 justify-end items-center">
        <LoginButton />
      </div>
    </nav>
  }
}

let make = Navigation.make
