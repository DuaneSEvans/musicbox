import gql from 'graphql-tag'

export type SongQuery = {
  data: {
    song: Song
  }
  vars: {
    id: string
  }
}

export const SONG_QUERY = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      durationInSeconds
      name
      youtubeId
      tags {
        id
        name
      }
    }
  }
`

export type SongsQuery = {
  data: {
    songs: Song[]
  }
  vars: {
    query: string
  }
}

export const SONGS_QUERY = gql`
  query LibrarySongsQuery($query: String) {
    songs(query: $query) {
      id
      durationInSeconds
      name
      youtubeId
      tags {
        id
        name
      }
    }
  }
`

export type TagCreate = {
  data: {}
  vars: {
    name: string
  }
}

export const TAG_CREATE = gql`
  mutation TagCreate($name: String!) {
    tagCreate(input: { name: $name }) {
      errors
    }
  }
`

export type TagToggle = {
  data: {}
  vars: {
    tagId: string
    addSongIds: string[]
    removeSongIds: string[]
  }
}

export const TAG_TOGGLE = gql`
  mutation TagToggle($tagId: ID!, $addSongIds: [ID!]!, $removeSongIds: [ID!]!) {
    tagToggle(input: { tagId: $tagId, addSongIds: $addSongIds, removeSongIds: $removeSongIds }) {
      errors
    }
  }
`

export type TagsQuery = {
  data: {
    tags: Tag[]
  }
  vars: {}
}

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  youtubeId: string
  tags: Tag[]
}

export type Tag = {
  id: string
  name: string
}
