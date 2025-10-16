export type RepresentativeCard = {
  name: string
  title: string
  territories: string[]
  phone: string
  email: string
  role: string
  image?: string
}

export const territoryRepresentatives: RepresentativeCard[] = [
  {
    name: "Brad Gwinnup",
    title: "President",
    territories: ["Utah", "Nevada"],
    phone: "801-232-8241",
    email: "Bradg@wcubedinc.com",
    role: "Utah, Nevada",
    image: "/placeholder.svg?height=300&width=300&text=Brad+Gwinnup",
  },
  {
    name: "Austin Gwinnup",
    title: "Sales Representative",
    territories: ["Idaho", "Wyoming"],
    phone: "801-803-8558",
    email: "Austing@wcubedinc.com",
    role: "Idaho, Wyoming",
    image: "/placeholder.svg?height=300&width=300&text=Austin+Gwinnup",
  },
  {
    name: "Cason Gwinnup",
    title: "Application Engineer/Project Manager",
    territories: ["All Territories"],
    phone: "801-664-2438",
    email: "Casong@wcubedinc.com",
    role: "Aftermarket Sales",
    image: "/placeholder.svg?height=300&width=300&text=Cason+Gwinnup",
  },
  {
    name: "Robert Haws",
    title: "Application Engineer/Project Manager",
    territories: ["All Territories"],
    phone: "385-270-6128",
    email: "Roberth@wcubedinc.com",
    role: "Parts",
    image: "/placeholder.svg?height=300&width=300&text=Robert+Haws",
  },
]
