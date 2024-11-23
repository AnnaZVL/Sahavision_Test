export interface Folder {
  id: number,
  name: string,
  children?: Array<Folder>
}

export const list: Array<Folder> = [
  {
    id: 1,
    name: 'Папка 1',
    children: [
      {
        id: 2,
        name: 'Папка 1.1',
        children: [
          {
            id: 3,
            name: 'Папка 1.2',
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Папка 2',
    children: [
      {
        id: 5,
        name: 'Папка 2.1',
      }
    ]
  },
  {
    id: 6,
    name: 'Папка 3',

  }
]
