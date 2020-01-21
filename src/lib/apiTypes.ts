export type RoomType = {
  id: string
  name: string
  users: UserType[]
  currentRecord: RoomPlaylistRecordType
}

export type RoomPlaylistRecordType = {
  id?: string
  playedAt: string
  song: SongType
}

export type SongType = {
  id: string
  name: string
  youtubeId: string
}

export type TeamType = {
  id: string
  name: string
}

export type UserType = {
  id: string
  email: string
  name: string
  activeRoom?: RoomType
  activeTeam?: TeamType
}
